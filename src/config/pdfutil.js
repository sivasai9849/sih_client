import { jsPDF } from "jspdf";

export const convertToPdf = (image) => {
  const doc = new jsPDF("p", "mm", "a4");
  const defaultWidth = 210;

  const imgWidth = doc.getImageProperties(image).width;
  const imgHeight = doc.getImageProperties(image).height;
  const ratio = imgWidth / imgHeight;
  const width = defaultWidth;
  const height = width / ratio;
  doc.addImage(image, "JPEG", 0, 0, width, height);

  const blob = doc.output("blob");
  const file = new File([blob], "output.pdf", { type: "application/pdf" });

  return file;
};
