const ConvertApiLink = (text: string): string => {
  const url = 'http://localhost:1337';
  // const regex = new RegExp('/upload/');
  const regex = /\/uploads\//g;
  const newSubstring = `${url}/uploads/`;
  const result = text.match(regex);
  console.log('Result:', result);
  const newText = text.replaceAll(regex, newSubstring);
  console.log('New Text:', newText);

  return newText;
};

export default ConvertApiLink;
