import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }

  generateReceipt(imageData: string, paragraph1: string, listItems: string[], paragraph2: string) {
    // Inicialmente, creamos un documento con una altura arbitraria
    let tempDoc = new jsPDF({
      unit: 'mm',
      format: [80, 200]
    });

    let yPos = 10;
    const pageWidth = tempDoc.internal.pageSize.getWidth();
    const imageWidth = 30;
    const imageHeight = 30;
    const currentDate: string = new Date().toISOString().split('T')[0];
    const headerText = `Fecha: ${currentDate} \nNIT: 1070621396-1 \n`;

    // Simulamos la generación del contenido para calcular la altura total
    yPos += imageHeight + 5;  // Espacio para la imagen

    yPos += 8;  // Título

    yPos += 8;  // Nombre

    const headerLines = tempDoc.splitTextToSize(headerText, 70);
    headerLines.forEach(() => {
      yPos += 5;
    });

    yPos += 10;  // Espacio antes del separador

    const paragraph1Lines = tempDoc.splitTextToSize(paragraph1, 70);
    paragraph1Lines.forEach(() => {
      yPos += 5;
    });
    yPos += 10;  // Espacio después del primer párrafo

    listItems.forEach(() => {
      yPos += 5;
    });
    yPos += 10;  // Espacio después de la lista

    const paragraph2Lines = tempDoc.splitTextToSize(paragraph2, 70);
    paragraph2Lines.forEach(() => {
      yPos += 5;
    });

    yPos += 15;  // Espacio después del segundo párrafo y del separador

    yPos += 6;  // Dirección 1
    yPos += 6;  // Dirección 2
    yPos += 6;  // Dirección 3

    yPos += 8;  // Información de contacto

    // Con la altura calculada, creamos un nuevo documento con la altura exacta
    let doc = new jsPDF({
      unit: 'mm',
      format: [80, yPos + 10]  // Añadimos un pequeño margen adicional
    });

    yPos = 10;

    // Agregar la imagen centrada
    doc.addImage(imageData, 'JPEG', (pageWidth - imageWidth) / 2, yPos, imageWidth, imageHeight);
    yPos += imageHeight + 5;

    // Título centrado
    doc.setFontSize(14);
    const titleWidth = doc.getTextWidth('EL ESTABLO');
    doc.text('EL ESTABLO', (pageWidth - titleWidth) / 2, yPos);
    yPos += 8;

    // Nombre centrado
    doc.setFontSize(8);
    const nameWidth = doc.getTextWidth('JULIÁN LÓPEZ');
    doc.text('JULIÁN LÓPEZ', (pageWidth - nameWidth) / 2, yPos);
    yPos += 8;

    // Encabezado centrado
    doc.setFontSize(8);
    headerLines.forEach((line: any | string[]) => {
      const lineWidth = doc.getTextWidth(line);
      doc.text(line, (pageWidth - lineWidth) / 2, yPos);
      yPos += 5;
    });

    // Separador
    yPos += 5;
    doc.setLineWidth(0.5);
    doc.line(5, yPos, pageWidth - 5, yPos);
    yPos += 5;

    // Primer párrafo
    paragraph1Lines.forEach((line: string | string[]) => {
      doc.text(line, 5, yPos);
      yPos += 5;
    });
    yPos += 10;

    // Lista de ítems
    listItems.forEach(item => {
      doc.text(`- ${item}`, 5, yPos);
      yPos += 5;
    });
    yPos += 10;

    // Segundo párrafo
    paragraph2Lines.forEach((line: string | string[]) => {
      doc.text(line, 5, yPos);
      yPos += 5;
    });

    // Separador
    yPos += 10;
    doc.line(5, yPos, pageWidth - 5, yPos);
    yPos += 5;

    // Información de contacto centrada
    doc.setFontSize(6);
    const address1 = 'Av. 30 No. 7b - 61 Barrio';
    const address1Width = doc.getTextWidth(address1);
    doc.text(address1, (pageWidth - address1Width) / 2, yPos);
    yPos += 6;

    const address2 = 'La Magdalena';
    const address2Width = doc.getTextWidth(address2);
    doc.text(address2, (pageWidth - address2Width) / 2, yPos);
    yPos += 6;

    const address3 = 'Girardot - Cundinamarca';
    const address3Width = doc.getTextWidth(address3);
    doc.text(address3, (pageWidth - address3Width) / 2, yPos);
    yPos += 6;

    doc.setFontSize(7);
    const contactInfo = 'Cel: 3108254252 - 311 8294347';
    const contactInfoWidth = doc.getTextWidth(contactInfo);
    doc.text(contactInfo, (pageWidth - contactInfoWidth) / 2, yPos);
    yPos += 8;

    // Guardar el PDF
    doc.save('receipt.pdf');
  }
}
