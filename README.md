# SydneyBikeMap

https://sydneybikemap.ethan.link/

A vector tile style and website designed for viewing bicycle infrastructure in Sydney and surrounds.

The area that the map covers is roughly based on the extents of the intercity trains network, as this is a good gauge for "near Sydney" if you can get to it with your Opal card and without having to box your bike :)

Why not all of NSW? Because it's easier to host and allows me to keep this site free, and since most bike infrastructure is in urban areas like Sydney/Newcastle/Wollongong anyway. If you would like to host your own version with all of NSW, Australia or the world, feel free. You can also run it locally and choose the area you would like (see tiles/README.md, you'd need to edit tiles/bbox.poly).

## Improving the data

The data for SydneyBikeMap comes from [OpenStreetMap](https://openstreetmap.org) (OSM) and is updated weekly. To edit the data, you will need to edit OpenStreetMap.

OpenStreetMap is a community-built database of the world &mdash; it has everything from roads, to cycleways, to businesses, to park benches. Anyone can contribute &mdash; think of it like the Wikipedia of the map world. It's used by large companies including Facebook/Meta, Snapchat, Strava, Apple [and more](https://welcome.openstreetmap.org/about-osm-community/consumers/). Compared to Google Maps data, It's often updated faster and includes more data on cycle routes, since there is a community to maintain it.

Since this site currently updates weekly, it may take up to a week for your changes to be shown on the site.

### How _not_ to contribute to OpenStreetMap

Before I give you some guidance on how to contribute, let's quickly cover how _not_ to contribute. OpenStreetMap is used by a much wider variety of applications than just this site, so it's important you treat it as if you were editing a Wikipedia article.

- **Don't edit the map based on old memories, or from copyrighted sources such as Google StreetView imagery.** Only edit based on the satellite imagery and other information available to you within the editor, or based on going and surveying it yourself in real life.
- **Don't map infrastructure you wish was there.** Only map things that are actually there.
- **Don't add proposed/planned cycleways if there's a low chance they'll get built.** For example if a cycleway was only mentioned in your council's bike plan 20 years ago. Only add them if it's likely they'll go ahead, it's just construction hasn't started quite yet.

Changes can usually be reverted, so it's not the end of the world if you make a mistake, but try to play nice. You can also join the [OSM World Discord][discord] and visit the `#oceania` channel if you have any questions, and experienced mappers will try help you out.

### How to contribute to OpenStreetMap

With that out of the way, let's get to the fun part! There's so many resources out there that explain things better than I ever could, so I'll just link you to some pages that I think will be relevant for what you're trying to do. Take a read, and if you're unsure, you can pop into the [Discord][discord] or feel free to [contact me][contact] (although there are people more experienced than I am).

- [The Wiki](https://wiki.openstreetmap.org/wiki/Main_Page) - The Wiki is like the Bible of OpenStreetMap, it has all the information in there about how to map various features. Most of the links below will be to particular wiki pages I think you'll find useful.
- [Beginner's Guide](https://wiki.openstreetmap.org/wiki/Beginners%27_Guide) - This should get you set up & going with some basic concepts. Once you have an account, if you click "Edit" on the main OSM site, the editor (called iD) will have an interactive tutorial showing you how to use it.
- [Cycleway documentation](https://wiki.openstreetmap.org/wiki/Tag:highway%3Dcycleway) - This page explains how to map a cycleway. Make sure to check the link below as well, since some things will differ slightly in Australia.
- [Australian Tagging Guidelines/Cycling and Foot Paths](https://wiki.openstreetmap.org/wiki/Australian_Tagging_Guidelines/Cycling_and_Foot_Paths) - This explains how to map cycleways in the Australian context, which is quite different to overseas as we have different infrastructure. This one is a must-read.
- [Construction ways documentation](https://wiki.openstreetmap.org/wiki/Tag:highway%3Dconstruction) - Guidance and things to consider when mapping features under construction (such as cycleways)
- [Proposed ways documentation](https://wiki.openstreetmap.org/wiki/Tag:highway%3Dproposed) - Guidance and things to consider when mapping proposed/planned features (such as cycleways)
- [Discord][discord] - Has various channels where you can get assistance. There is an oceania-specific one called `#oceania`.
- [r/openstreetmap](https://reddit.com/r/openstreetmap) - Questions and discussion related to OSM

## Roadmap

(or should I say Cyclewaymap 😄)

This project is far from done, there's lots of things I want to add!

- [x] Separated cycleways
- [x] Shared paths
- [x] Cycleways under construction
- [x] Planned/proposed cycleways
- [x] &le;30km/h streets, showing speed limits (cause some of these are as relaxed as cycleways)
- [x] Display one-way streets
- [ ] Display contraflows (currently just hides one-way symbol if bikes are allowed both ways, but doesn't show the street as special)
- [x] Make train lines & stations more prominent (to plan bike+train journeys)
- [x] Better styling for motorway tunnels
- [x] Bike parking
- [ ] Drinking water (for when you're out on a ride)
- [ ] Toilets (for when you're out on a ride)
- [ ] Public bike pumps
- [ ] StreetView embeds
- [x] Elevation contour lines
- [ ] Stairs
- [ ] Render pedestrian streets/areas

Feel free to [contact me][contact] if you have any other ideas/requests (some may be more feasible than others).

Not looking to support routing/navigation/directions for now, as that's a whole different can of worms.

[discord]: https://discord.gg/openstreetmap
[contact]: mailto:sydneybikemap@ethan.link
