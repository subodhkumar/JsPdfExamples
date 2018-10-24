function genData() {
  for (var i = 0; i < 55; i++) {
    var para = document.createElement('p');
    var node = document.createTextNode(
      'This is a looooooooooooooong string, This is a looooooooooooooong string, This is a looooooooooooooong string, This is a looooooooooooooong string, This is a looooooooooooooong string, This is a looooooooooooooong string, This is a looooooooooooooong string, ' +
        i,
    );
    para.appendChild(node);
    document.getElementById('capture').appendChild(para);
  }
  esPdfSingleTest();
  // esPdf();
  //esPdfSingle();
}

function createEle(val, div) {
  var para = document.createElement('p');
  var node = document.createTextNode(val);
  para.appendChild(node);
  document.getElementById(div).appendChild(para);
}
function esPdfSingleTest() {
  const doc = jsPDF('p', 'mm', 'a4');
  doc.addHTML(
    document.getElementById('capture'),
    10,
    10,
    {
      pagesplit: true,
      margin: { top: 10, right: 10, bottom: 10, left: 10, useFor: 'page' },
    },
    function() {
      doc.save('test.pdf');
    },
  );
}
function esPdfSingle() {
  html2canvas(document.querySelector('#capture'), {}).then(canvas => {
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'px', [canvas.width, canvas.height]);
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
    pdf.save('es_pdf.pdf');
  });
}

function esPdf() {
  html2canvas(document.querySelector('#capture'), {}).then(canvas => {
    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;

    const ratio = A4_WIDTH_MM / canvas.width;

    let imgWidth = canvas.width * ratio;
    let imgHeight = canvas.height * ratio;

    const imgData = canvas.toDataURL('image/png');

    console.log(` SPEC | ${canvas.width} | ${canvas.height} | ${ratio}`);
    console.log(` CALC | ${imgWidth} | ${imgHeight} | ${A4_HEIGHT_MM}`);
    const pdf = new jsPDF('p', 'mm', [A4_WIDTH_MM, A4_HEIGHT_MM]);
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    let counter = 1;
    while (counter * A4_HEIGHT_MM <= imgHeight) {
      pdf.addPage('[A4_WIDTH_MM, A4_HEIGHT_MM]', 'p');
      pdf.addImage(
        imgData,
        'PNG',
        0,
        -A4_HEIGHT_MM * counter,
        imgWidth,
        imgHeight,
      );
      counter++;
    }

    pdf.save('es_pdf.pdf');
  });
}
function pdfFunction() {
  html2canvas(document.querySelector('#capture'), {
    scale: 0.5,
  }).then(canvas => {
    // document.body.appendChild(canvas);
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'pt', [canvas.width, canvas.height]);

    // const pageHeight = 841;
    // const maxHeight = canvas.height;
    // let currentHeight = pageHeight;
    pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

    // while(currentHeight<maxHeight){
    //     pdf.addPage("a4","p");
    //     pdf.addImage(imgData,'PNG',0,currentHeight,300,canvas.height);
    //     currentHeight+=pageHeight;
    // }
    pdf.save('dnew.pdf');
  });
}
function pdfFunctionOld() {
  html2canvas(document.querySelector('#capture')).then(canvas => {
    //    document.body.appendChild(canvas)
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF();

    var imgWidth = 210;
    var pageHeight = 841;
    var imgHeight = canvas.height; // * imgWidth / canvas.width;
    var heightLeft = imgHeight;

    createEle('Canvas Height | ' + canvas.height.toString(), 'stats');
    createEle('Image Height | ' + imgHeight.toString(), 'stats');

    var position = 0;
    pdf.addImage(imgData, 'PNG', 0, canvas.width, canvas.height);
    heightLeft -= pageHeight;
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage('a4', 'p');
      pdf.addImage(imgData, 'PNG', 0, position, canvas.width, canvas.height);
      heightLeft -= pageHeight;
    }
    //                pdf.save("download.pdf");
    consoe.log(pdf);
  });
}
