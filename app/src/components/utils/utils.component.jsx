export const SET_HEIGHT = (distanceToTop, lng, bottom, headerHeight, rowHeight) => {
  const height = window.innerHeight - distanceToTop - (bottom ? bottom : 0);
  const rowsHeight = lng * rowHeight + headerHeight;

  return (rowsHeight < height ? rowsHeight : height);
};
