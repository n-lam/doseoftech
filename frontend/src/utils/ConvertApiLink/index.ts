const ConvertApiLink = (text: string): string => {
  const regex = /\/uploads\//g;
  const newSubstring = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/uploads/`;
  const result = text.match(regex);
  console.log('Result:', result);
  const newText = text.replaceAll(regex, newSubstring);
  console.log('New Text:', newText);

  return newText;
};

export default ConvertApiLink;
