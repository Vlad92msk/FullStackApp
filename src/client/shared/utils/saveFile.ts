export const saveFile = (url: string, name?: string) => {
  const aEl = document.createElement('a');

  aEl.href = url;
  aEl.target = '_blank';

  if (name) {
    aEl.download = name;
  }

  aEl.click();
};
