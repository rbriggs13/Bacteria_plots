d3.selectAll('#selectOption').on('change', printWords);

function printWords() {
  let option = d3.selectAll('#selectOption').node().value;
  
  console.log(option);
}