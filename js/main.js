import data from './data.js';
import { dom, rules, datasets, setModels } from './model.js';
import { renderTable, showProcessesOnButtonClick } from './view.js';
import {
  processStepsTables,
  buildDecisionTree,
  processDataTesting,
} from './control.js';

const init = async () => {
  // prepare all datas
  setModels(data.rules, data.datasets, data.parameters);

  // show rules and datasets
  renderTable(dom.tableClassification, rules);
  renderTable(dom.tableDataset, datasets);

  // process all step and tables
  processStepsTables();

  // build decision tree
  buildDecisionTree();

  // show processedTables on click button
  await showProcessesOnButtonClick();

  // process data testing
  processDataTesting();
};

init();
