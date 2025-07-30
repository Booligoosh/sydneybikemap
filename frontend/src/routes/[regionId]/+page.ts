import { REGIONS } from "$lib/regions";
import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
  const regionConfig = REGIONS.find((r) => r.id === params.regionId);

  if (regionConfig) return { regionConfig };

  error(404, "Not found");
};
