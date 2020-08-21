// variable for dom element
export const dom = {
  tableContainer: document.querySelector('div.container-table100'),
  tableClassification: document.querySelector('.table.rule'),
  tableDataset: document.querySelector('.table.dataset'),
  buttonProcessContainer: document.querySelector('#btn-process-container'),
  buttonProcess: document.querySelector('#btn-process'),
};

// models
export let rules, datasets, parameters;

// set model's value
export const setModels = (rulesValue, datasetsValue, parametersValue) => {
  rules = rulesValue;
  datasets = datasetsValue;
  parameters = parametersValue;
};

// table datas
export let processedTablesDatas = [];

// table structure for view
export let processedTables = [];

// create a table row
export const row = (
  parameter,
  kriteria,
  jumlahKasus,
  tunda,
  tidak,
  ya,
  entropy,
  gain,
) => ({
  parameter: parameter,
  kriteria: kriteria,
  jumlahKasus: jumlahKasus,
  tunda: tunda,
  tidak: tidak,
  ya: ya,
  entropy: entropy,
  gain: gain,
});

// decision tree
export let decisionTree = [];
