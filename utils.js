window.getHierarchyOpacity = function (depth) {
  switch (depth) {
    case 0:
      return 0.4; // Center
    case 1:
      return 1; // Main categories
    case 2:
      return 1; // Sub-categories
    case 3:
      return 1; // Skills (leaves)
    default:
      return 1;
  }
};

window.getSliceColor = function (d) {
  return d.data.value >= d.data.expected
    ? window.SkillColors.Green
    : d.data.value * 2 < d.data.expected
    ? window.SkillColors.Red
    : window.SkillColors.Yellow;
};

window.labelTransform = function (d, radius) {
  const x = (((d.x0 + d.x1) / 2) * 180) / Math.PI;
  const y = ((d.y0 + d.y1) / 2) * radius;
  return `rotate(${x - 90}) translate(${y / 180},0) rotate(${
    x < 180 ? 0 : 180
  })`;
};
