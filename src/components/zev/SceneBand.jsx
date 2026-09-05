import ZevScenePicture from "./ZevScenePicture";

// A full-width breath between the roadmap and the takeaway: the on-site
// scene, edge to edge, masked top and bottom so it rises out of one section
// and dissolves into the next. Decorative, so hidden from assistive tech;
// the hero already describes the same picture.

const SceneBand = () => (
  <section aria-hidden="true" className="scene-band relative h-[52vh] max-h-[640px] min-h-[340px] w-full bg-background">
    <ZevScenePicture
      mask="band"
      aspect="h-full"
      position="object-[50%_42%]"
      placeholderPosition="50% 42%"
      sizes="100vw"
      alt=""
    />
  </section>
);

export default SceneBand;
