import { Construct } from "constructs";
import { TerraformStack, TerraformVariable } from "cdktf";
import { CloudflareProvider } from "@cdktf/provider-cloudflare/lib/provider";
import { R2Bucket } from "@cdktf/provider-cloudflare/lib/r2-bucket";
import { PagesProject } from "@cdktf/provider-cloudflare/lib/pages-project";
import { PagesDomain } from "@cdktf/provider-cloudflare/lib/pages-domain";
import { Ruleset } from "@cdktf/provider-cloudflare/lib/ruleset";
import { Record } from "@cdktf/provider-cloudflare/lib/record";

export class MainStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const accountId = new TerraformVariable(this, "cloudflareAccountId", {
      type: "string",
      sensitive: false,
    });
    const apiToken = new TerraformVariable(this, "cloudflareApiToken", {
      type: "string",
      sensitive: true,
    });
    const zoneId = new TerraformVariable(this, "cloudflareZoneId", {
      type: "string",
      sensitive: false,
    });

    new CloudflareProvider(this, "cloudflare", {
      apiToken: apiToken.stringValue,
    });

    /** R2 BUCKETS */

    new R2Bucket(this, "tilesBucket", {
      name: "sydneybikemap-tiles",
      accountId: accountId.stringValue,
    });

    /** CLOUDFLARE PAGES */

    const pagesProject = new PagesProject(this, "frontendPagesProject", {
      name: "sydneybikemap",
      productionBranch: "main",
      accountId: accountId.stringValue,
    });

    new PagesDomain(this, "frontendPagesDomain", {
      domain: "sydneybikemap.ethan.link",
      projectName: pagesProject.name,
      accountId: accountId.stringValue,
    });

    /** DNS RECORDS */

    new Record(this, "frontendDns", {
      name: "sydneybikemap",
      proxied: true,
      ttl: 1,
      type: "CNAME",
      value: "sydneybikemap.pages.dev",
      zoneId: zoneId.stringValue,
    });

    new Record(this, "tilesDns", {
      name: "pmtiles.sydneybikemap",
      proxied: true,
      ttl: 1,
      type: "CNAME",
      value: "public.r2.dev",
      zoneId: zoneId.stringValue,
    });

    /** CACHE RULES */

    new Ruleset(this, "cacheRules", {
      kind: "zone",
      name: "default",
      phase: "http_request_cache_settings",
      zoneId: zoneId.stringValue,
      rules: [
        {
          description: "Don't cache sydneybikemap.ethan.link/sw.js",
          expression:
            '(http.host eq "sydneybikemap.ethan.link" and http.request.uri.path eq "/sw.js")',
          action: "set_cache_settings",
          actionParameters: [
            {
              cache: false,
            },
          ],
          enabled: true,
        },
        {
          description: "Cache pmtiles",
          expression: '(http.host eq "pmtiles.sydneybikemap.ethan.link")',
          action: "set_cache_settings",
          actionParameters: [
            {
              browserTtl: [{ default: 7200, mode: "override_origin" }],
              cache: true,
              edgeTtl: [{ default: 7200, mode: "override_origin" }],
              respectStrongEtags: true,
            },
          ],
          enabled: true,
        },
      ],
    });

    /** TRANSFORM RULES */

    new Ruleset(this, "transformRules", {
      kind: "zone",
      name: "default",
      phase: "http_response_headers_transform",
      zoneId: zoneId.stringValue,
      rules: [
        {
          description: "SydneyBikeMap Tiles CORS",
          expression: '(http.host eq "pmtiles.sydneybikemap.ethan.link")',
          action: "rewrite",
          actionParameters: [
            {
              headers: [
                {
                  name: "Access-Control-Allow-Headers",
                  operation: "set",
                  value: "range",
                },
                {
                  name: "Access-Control-Allow-Origin",
                  operation: "set",
                  value: "*",
                },
              ],
            },
          ],
          enabled: true,
        },
      ],
    });
  }
}
