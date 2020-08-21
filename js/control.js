import {
  processedTables,
  processedTablesDatas,
  row,
  datasets,
  parameters,
  decisionTree,
  rules,
} from './model.js';

// for first step
const getTotalJumlahKasus = () => datasets.length;

// feature: 'tunda' || 'tidak' || 'ya'
const getTotalJumlahFeature = (feature) => {
  feature = feature.toUpperCase();
  return datasets.filter((el) => el.keputusan == feature).length;
};

// nodeName: total || lamaUsaha 3 - 7 || omzet < 1
// parameter: 'lamaUsaha' || 'jumlahPekerja' || 'omzet' || 'jumlahAset'
// criteria:
//          '0 - 2' || '3 - 7' || '> 7' ||
//          '< 10' || '109' || '20 - 30' ||
//          '< 1' || '1 - 2' || '3 - 5' ||
//          '< 5' || '5 - 6' || '70'
// jumlahPekerja 109 & omzet < 10
const getJumlahKasus = (nodeName, parameter, criteria) => {
  const criteriaToken = criteria.split(' ');
  const nodeConditions = nodeName.split(' & ');
  const nodeParameters = nodeConditions.map((el) =>
    el.slice(0, el.indexOf(' ')),
  );
  const nodeCriterias = nodeConditions.map((el) =>
    el.slice(el.indexOf(' ') + 1),
  );
  let tempDataset = [];

  for (let i = 0; i < nodeConditions.length; i++) {
    const splittedCriteria = nodeCriterias[i].split(' ');
    if (splittedCriteria.length == 2) {
      if (splittedCriteria[0] == '<') {
        tempDataset =
          tempDataset.length == 0
            ? datasets.filter(
                (el) =>
                  parseInt(el[nodeParameters[i]]) <
                  parseInt(splittedCriteria[1]),
              )
            : tempDataset.filter(
                (el) =>
                  parseInt(el[nodeParameters[i]]) <
                  parseInt(splittedCriteria[1]),
              );
      } else if (splittedCriteria[0] == '>') {
        tempDataset =
          tempDataset.length == 0
            ? datasets.filter(
                (el) =>
                  parseInt(el[nodeParameters[i]]) >
                  parseInt(splittedCriteria[1]),
              )
            : tempDataset.filter(
                (el) =>
                  parseInt(el[nodeParameters[i]]) >
                  parseInt(splittedCriteria[1]),
              );
      }
    } else if (splittedCriteria.length == 3) {
      tempDataset =
        tempDataset.length == 0
          ? datasets.filter(
              (el) =>
                parseInt(el[nodeParameters[i]]) >=
                  parseInt(splittedCriteria[0]) &&
                parseInt(el[nodeParameters[i]]) <=
                  parseInt(splittedCriteria[2]),
            )
          : tempDataset.filter(
              (el) =>
                parseInt(el[nodeParameters[i]]) >=
                  parseInt(splittedCriteria[0]) &&
                parseInt(el[nodeParameters[i]]) <=
                  parseInt(splittedCriteria[2]),
            );
    }
  }

  if (criteriaToken.length == 2) {
    if (criteriaToken[0] == '<') {
      return nodeName == 'total'
        ? datasets.filter(
            (el) => parseInt(el[parameter]) < parseInt(criteriaToken[1]),
          ).length
        : tempDataset.filter(
            (el) => parseInt(el[parameter]) < parseInt(criteriaToken[1]),
          ).length;
    } else if (criteriaToken[0] == '>') {
      return nodeName == 'total'
        ? datasets.filter(
            (el) => parseInt(el[parameter]) > parseInt(criteriaToken[1]),
          ).length
        : tempDataset.filter(
            (el) => parseInt(el[parameter]) > parseInt(criteriaToken[1]),
          ).length;
    }
  } else if (criteriaToken.length == 3) {
    return nodeName == 'total'
      ? datasets.filter(
          (el) =>
            parseInt(el[parameter]) >= parseInt(criteriaToken[0]) &&
            parseInt(el[parameter]) <= parseInt(criteriaToken[2]),
        ).length
      : tempDataset.filter(
          (el) =>
            parseInt(el[parameter]) >= parseInt(criteriaToken[0]) &&
            parseInt(el[parameter]) <= parseInt(criteriaToken[2]),
        ).length;
  }
};

// nodeName: total || lamaUsaha 3 - 7 || omzet < 1
// feature: 'tunda' || 'tidak' || 'ya'
// parameter: 'lamaUsaha' || 'jumlahPekerja' || 'omzet' || 'jumlahAset'
// criteria:
//          '0 - 2' || '3 - 7' || '> 7' ||
//          '< 10' || '109' || '20 - 30' ||
//          '< 1' || '1 - 2' || '3 - 5' ||
//          '< 5' || '5 - 6' || '70'
const getJumlahFeature = (nodeName, feature, parameter, criteria) => {
  feature = feature.toUpperCase();
  const criteriaToken = criteria.split(' ');
  const nodeConditions = nodeName.split(' & ');
  const nodeParameters = nodeConditions.map((el) =>
    el.slice(0, el.indexOf(' ')),
  );
  const nodeCriterias = nodeConditions.map((el) =>
    el.slice(el.indexOf(' ') + 1),
  );
  let tempDataset = [];

  for (let i = 0; i < nodeConditions.length; i++) {
    const splittedCriteria = nodeCriterias[i].split(' ');
    if (splittedCriteria.length == 2) {
      if (splittedCriteria[0] == '<') {
        tempDataset =
          tempDataset.length == 0
            ? datasets.filter(
                (el) =>
                  parseInt(el[nodeParameters[i]]) <
                  parseInt(splittedCriteria[1]),
              )
            : tempDataset.filter(
                (el) =>
                  parseInt(el[nodeParameters[i]]) <
                  parseInt(splittedCriteria[1]),
              );
      } else if (splittedCriteria[0] == '>') {
        tempDataset =
          tempDataset.length == 0
            ? datasets.filter(
                (el) =>
                  parseInt(el[nodeParameters[i]]) >
                  parseInt(splittedCriteria[1]),
              )
            : tempDataset.filter(
                (el) =>
                  parseInt(el[nodeParameters[i]]) >
                  parseInt(splittedCriteria[1]),
              );
      }
    } else if (splittedCriteria.length == 3) {
      tempDataset =
        tempDataset.length == 0
          ? datasets.filter(
              (el) =>
                parseInt(el[nodeParameters[i]]) >=
                  parseInt(splittedCriteria[0]) &&
                parseInt(el[nodeParameters[i]]) <=
                  parseInt(splittedCriteria[2]),
            )
          : tempDataset.filter(
              (el) =>
                parseInt(el[nodeParameters[i]]) >=
                  parseInt(splittedCriteria[0]) &&
                parseInt(el[nodeParameters[i]]) <=
                  parseInt(splittedCriteria[2]),
            );
    }
  }

  if (criteriaToken.length == 2) {
    if (criteriaToken[0] == '<') {
      return nodeName == 'total'
        ? datasets.filter(
            (el) =>
              parseInt(el[parameter]) < parseInt(criteriaToken[1]) &&
              el.keputusan == feature,
          ).length
        : tempDataset.filter(
            (el) =>
              parseInt(el[parameter]) < parseInt(criteriaToken[1]) &&
              el.keputusan == feature,
          ).length;
    } else if (criteriaToken[0] == '>') {
      return nodeName == 'total'
        ? datasets.filter(
            (el) =>
              parseInt(el[parameter]) > parseInt(criteriaToken[1]) &&
              el.keputusan == feature,
          ).length
        : tempDataset.filter(
            (el) =>
              parseInt(el[parameter]) > parseInt(criteriaToken[1]) &&
              el.keputusan == feature,
          ).length;
    }
  } else if (criteriaToken.length == 3) {
    return nodeName == 'total'
      ? datasets.filter(
          (el) =>
            parseInt(el[parameter]) >= parseInt(criteriaToken[0]) &&
            parseInt(el[parameter]) <= parseInt(criteriaToken[2]) &&
            el.keputusan == feature,
        ).length
      : tempDataset.filter(
          (el) =>
            parseInt(el[parameter]) >= parseInt(criteriaToken[0]) &&
            parseInt(el[parameter]) <= parseInt(criteriaToken[2]) &&
            el.keputusan == feature,
        ).length;
  }
};

// jumlahKasus, tunda, tidak, ya: getTotalJumlahKasus() / getJumlahKasus(...), ...
const getEntropy = (jumlahKasus, tunda, tidak, ya) => {
  if (tunda == 0 || tidak == 0 || ya == 0) {
    return 0;
  } else {
    return (
      (-tunda / jumlahKasus) * Math.log2(tunda / jumlahKasus) +
      (-tidak / jumlahKasus) * Math.log2(tidak / jumlahKasus) +
      (-ya / jumlahKasus) * Math.log2(ya / jumlahKasus)
    );
  }
};

// step: (langkah 1 = 0, langkah 2 = 1, ...)
// tableIndex: (tabel 1 = 0, tabel 2 = 1, ...)
// parameter: 'lamaUsaha' || 'jumlahPekerja' || 'omzet' || 'jumlahAset'
// jumlahKasus: jumlah kasus parameter node
// entropy: entropy parameter node
const getGain = (stepIndex, tableIndex, parameter, jumlahKasus, entropy) => {
  let criteriasContainer = {};

  // console.log(processedTablesDatas[stepIndex].tables[tableIndex]);
  for (const objekParameter of processedTablesDatas[stepIndex].tables[
    tableIndex
  ]) {
    // console.log(objekParameter);
    for (const [name, values] of Object.entries(objekParameter)) {
      if (name == parameter) {
        // console.log(name, values);
        criteriasContainer[parameter] = values;
      }
    }
  }
  // console.log(criteriasContainer);

  let gain = 0;
  for (const [parameterName, criterias] of Object.entries(criteriasContainer)) {
    const hasilcriteria = [];
    for (const [criteria, values] of Object.entries(criterias)) {
      hasilcriteria.push((values.jumlahKasus / jumlahKasus) * values.entropy);
    }
    gain = entropy - hasilcriteria.reduce((sum, x) => sum + x, 0);
  }

  return gain.toFixed(6);
};

// make a step
const createStep = (stepIndex) => {
  processedTablesDatas.push({
    title: `LANGKAH ${stepIndex + 1}`,
    tables: [],
  });
  processedTables.push({
    title: processedTablesDatas[stepIndex].title,
    tables: [],
  });
};

const prepStepData = (stepIndex, parameters) => {
  if (stepIndex == 0) {
    processedTablesDatas[stepIndex].tables.push([]);
    for (const [index, parameter] of parameters.entries()) {
      const name = (
        parameter.name.charAt(0).toLowerCase() + parameter.name.slice(1)
      ).replace(' ', '');
      let criteriaObject = {};

      processedTablesDatas[stepIndex].tables[0].push({
        [name]: {},
        gain: 0,
      });

      for (const criteria of parameter.criterias) {
        criteriaObject[criteria] = {
          ['jumlahKasus']: 0,
          ['tunda']: 0,
          ['tidak']: 0,
          ['ya']: 0,
          ['entropy']: 0,
        };
      }

      // add criterias into parameter
      processedTablesDatas[stepIndex].tables[0][index][name] = criteriaObject;
    }
  } else {
    for (const [tableIndex, tableParameters] of parameters.entries()) {
      processedTablesDatas[stepIndex].tables.push([]);

      for (const [index, parameter] of tableParameters.entries()) {
        const name = (
          parameter.name.charAt(0).toLowerCase() + parameter.name.slice(1)
        ).replace(' ', '');
        processedTablesDatas[stepIndex].tables[tableIndex].push({
          [name]: {},
          gain: 0,
        });

        let criteriaObject = {};

        for (const criteria of parameter.criterias) {
          criteriaObject[criteria] = {
            ['jumlahKasus']: 0,
            ['tunda']: 0,
            ['tidak']: 0,
            ['ya']: 0,
            ['entropy']: 0,
          };
        }

        processedTablesDatas[stepIndex].tables[tableIndex][index][
          name
        ] = criteriaObject;
      }
    }
  }
  // console.log(processedTablesDatas);
};

// create table's node for view
const setTableNode = (stepIndex, tablesNodes = []) => {
  // console.log(tablesNodes);
  if (stepIndex == 0 && tablesNodes.length == 0) {
    processedTables[stepIndex].tables.push([
      row(
        'Total',
        '',
        getTotalJumlahKasus(),
        getTotalJumlahFeature('tunda'),
        getTotalJumlahFeature('tidak'),
        getTotalJumlahFeature('ya'),
        getEntropy(
          getTotalJumlahKasus(),
          getTotalJumlahFeature('tunda'),
          getTotalJumlahFeature('tidak'),
          getTotalJumlahFeature('ya'),
        ).toFixed(6),
        '',
      ),
    ]);
  } else {
    for (const tableNodes of tablesNodes) {
      for (const node of tableNodes) {
        processedTables[stepIndex].tables.push([
          row(
            node.name,
            '',
            node.jumlahKasus,
            node.tunda,
            node.tidak,
            node.ya,
            node.entropy,
            '',
          ),
        ]);
      }
    }
  }
  // console.log(processedTables);
};

// make step table's data
// nodeName: total || lamaUsaha 3 - 7 || omzet < 1
const setStepTableData = (stepIndex, tableIndex, nodeName, parameters) => {
  // console.log(parameters);

  for (const [index, parameter] of parameters.entries()) {
    const name = (
      parameter.name.charAt(0).toLowerCase() + parameter.name.slice(1)
    ).replace(' ', '');

    for (const criteria of parameter.criterias) {
      processedTablesDatas[stepIndex].tables[tableIndex][index][name][
        criteria
      ] = {
        ['jumlahKasus']: getJumlahKasus(nodeName, name, criteria),
        ['tunda']: getJumlahFeature(nodeName, 'tunda', name, criteria),
        ['tidak']: getJumlahFeature(nodeName, 'tidak', name, criteria),
        ['ya']: getJumlahFeature(nodeName, 'ya', name, criteria),
        ['entropy']: getEntropy(
          getJumlahKasus(nodeName, name, criteria),
          getJumlahFeature(nodeName, 'tunda', name, criteria),
          getJumlahFeature(nodeName, 'tidak', name, criteria),
          getJumlahFeature(nodeName, 'ya', name, criteria),
        ).toFixed(6),
      };
    }
  }
};

// store gain
const storeGain = (stepIndex, tableIndex) => {
  for (const parameters of processedTablesDatas[stepIndex].tables[tableIndex]) {
    // console.log(parameters);

    for (const [parameter, criterias] of Object.entries(parameters)) {
      if (parameter != 'gain') {
        // console.log(parameter, criterias);
        parameters.gain = getGain(
          stepIndex,
          tableIndex,
          parameter,
          processedTables[stepIndex].tables[tableIndex][0].jumlahKasus,
          processedTables[stepIndex].tables[tableIndex][0].entropy,
        );
      }
    }
  }
  // console.log(processedTablesDatas);
};

// determine highest gain in a table
const getHighestGain = (stepIndex, tableIndex) => {
  let parameters = [],
    gains = [],
    highestGain;

  for (const [parameterIndex, rowData] of processedTablesDatas[
    stepIndex
  ].tables[tableIndex].entries()) {
    // console.log(rowData);

    let parameter, gain;
    for (const [key, value] of Object.entries(rowData)) {
      key != 'gain' ? (parameter = key) : (gain = value);
    }
    parameters.push({
      tableIndex: tableIndex,
      parameterIndex: parameterIndex,
      name: parameter,
      gain: gain,
    });
  }

  for (const parameter of parameters) {
    gains.push(parameter.gain);
  }

  highestGain = Math.max.apply(null, gains);

  return parameters.filter((el) => el.gain == highestGain);
};

// prepare for table's view
const prepareTableView = (stepIndex, tableIndex) => {
  for (const rowDatas of processedTablesDatas[stepIndex].tables[tableIndex]) {
    // console.log(rowDatas);
    for (let [parameter, criterias] of Object.entries(rowDatas)) {
      if (parameter != 'gain') {
        parameter =
          parameter.charAt(0).toUpperCase() +
          parameter
            .split(/(?=[A-Z])/)
            .join(' ')
            .slice(1);
        // console.log(parameter, criterias);
        processedTables[stepIndex].tables[tableIndex].push(
          row(parameter, '', '', '', '', '', '', rowDatas.gain),
        );
        for (const [criteria, value] of Object.entries(criterias)) {
          // console.log(criteria, value);
          processedTables[stepIndex].tables[tableIndex].push(
            row(
              '',
              criteria,
              value.jumlahKasus,
              value.tunda,
              value.tidak,
              value.ya,
              value.entropy,
              '',
            ),
          );
        }
      }
    }
  }
  // console.log(processedTables);
};

export const processStepsTables = () => {
  // variables
  let stepIndex = 0;
  let tableIndex = 0;

  let highestGainParameters = [];
  let newTablesParameters = [];
  let tablesNodes = [];

  // step 1
  createStep(stepIndex);
  prepStepData(stepIndex, parameters);
  setTableNode(stepIndex);
  setStepTableData(stepIndex, tableIndex, 'total', parameters);
  storeGain(stepIndex, tableIndex);
  prepareTableView(stepIndex, tableIndex);
  do {
    // step > 1
    highestGainParameters = [];
    newTablesParameters = [];
    tablesNodes = [];

    // store highest parameters
    for (const [index, table] of processedTablesDatas[
      stepIndex
    ].tables.entries()) {
      for (const highestGainParameter of getHighestGain(stepIndex, index)) {
        highestGainParameters.push(highestGainParameter);
      }
    }
    // console.log(highestGainParameters);

    // store generated tablesNodes
    for (const highestGainParameter of highestGainParameters) {
      const nodes = [];
      for (const [criteria, value] of Object.entries(
        processedTablesDatas[stepIndex].tables[highestGainParameter.tableIndex][
          highestGainParameter.parameterIndex
        ][highestGainParameter.name],
      )) {
        let decisionCount = [value.tunda, value.tidak, value.ya].filter(
          (el) => el > 0,
        ).length;

        if (decisionCount > 1) {
          nodes.push({
            name: `${
              stepIndex > 0
                ? processedTables[stepIndex].tables[
                    highestGainParameter.tableIndex
                  ][0].parameter + ' & '
                : ''
            }${highestGainParameter.name} ${criteria}`,
            jumlahKasus: value.jumlahKasus,
            tunda: value.tunda,
            tidak: value.tidak,
            ya: value.ya,
            entropy: value.entropy,
          });
        }
      }
      tablesNodes.push([]);
      for (const node of nodes) {
        tablesNodes[tablesNodes.length - 1].push(node);
      }
    }
    // console.log(tablesNodes);

    // store needed parameters
    for (const tableNodes of tablesNodes) {
      for (const node of tableNodes) {
        newTablesParameters.push([]);

        const nodeConditions = node.name.split(' & ');
        const nodeParameters = nodeConditions.map((el) => el.split(' ')[0]);

        let neededParameters = [];

        for (const nodeParameter of nodeParameters) {
          if (neededParameters.length == 0) {
            neededParameters = parameters.filter(
              (el) =>
                (el.name.charAt(0).toLowerCase() + el.name.slice(1)).replace(
                  ' ',
                  '',
                ) != nodeParameter,
            );
          } else {
            neededParameters = neededParameters.filter(
              (el) =>
                (el.name.charAt(0).toLowerCase() + el.name.slice(1)).replace(
                  ' ',
                  '',
                ) != nodeParameter,
            );
          }
        }

        for (const parameter of neededParameters) {
          newTablesParameters[newTablesParameters.length - 1].push(parameter);
        }
      }
    }
    // console.log(newTablesParameters);

    // refresh variable
    stepIndex++;
    tableIndex = 0;

    // start build step
    createStep(stepIndex);
    prepStepData(stepIndex, newTablesParameters);
    setTableNode(stepIndex, tablesNodes);

    for (const tableNodes of tablesNodes) {
      for (const node of tableNodes) {
        setStepTableData(
          stepIndex,
          tableIndex,
          node.name,
          newTablesParameters[tableIndex],
        );
        storeGain(stepIndex, tableIndex);
        prepareTableView(stepIndex, tableIndex);
        tableIndex++;
      }
    }
  } while (processedTablesDatas[stepIndex].tables.every((el) => el.length > 1));
  // console.log('');
  // console.log(processedTablesDatas);
  // console.log(processedTables);
};

export const buildDecisionTree = () => {
  for (let i = 1; i < processedTables.length; i++) {
    const processedTable = processedTables[i].tables;
    // console.log(processedTable);
    for (const tableData of processedTable) {
      // console.log(tableData);
      const nodeConditions = tableData[0].parameter.split(' & ');
      const nodeParameters = nodeConditions.map((el) =>
        el.slice(0, el.indexOf(' ')),
      );
      const nodeCriterias = nodeConditions.map((el) =>
        el.slice(el.indexOf(' ') + 1),
      );
      let nodeString = '';

      // build node string
      for (const [conditionIndex, nodeCondition] of nodeConditions.entries()) {
        nodeString += nodeParameters[conditionIndex];
        nodeString += ' ';
        nodeString += nodeCriterias[conditionIndex];
        nodeString += ' & ';
      }

      // target highest gain parameter
      const tableParameters = tableData
        .map((el, i) => ({
          rowIndex: i,
          data: el,
        }))
        .filter((el) => el.data.gain != '');
      const maxGain = Math.max.apply(
        Math,
        tableParameters.map((el) => el.data.gain),
      );
      const childNodes = tableParameters.filter(
        (el) => el.data.gain == maxGain,
      );
      // console.log(childNodes);

      // determine the decision
      for (const node of childNodes) {
        const highestGainData = tableData.slice(
          node.rowIndex,
          node.rowIndex + 4,
        );
        // console.log(highestGainData);
        for (const highestGainRow of highestGainData) {
          const parameter =
            highestGainData[0].parameter.charAt(0).toLowerCase() +
            highestGainData[0].parameter.replace(' ', '').slice(1);
          const criteria = highestGainRow.kriteria;
          let decision = 'TIDAK BISA MEMUTUSKAN';
          if (
            [
              highestGainRow.tunda,
              highestGainRow.tidak,
              highestGainRow.ya,
            ].filter((el) => el == 0).length == 2
          ) {
            if (highestGainRow.tunda > 0) {
              decision = 'TUNDA';
            } else if (highestGainRow.tidak > 0) {
              decision = 'TIDAK';
            } else if (highestGainRow.ya > 0) {
              decision = 'YA';
            }
          }

          if (
            i == processedTables.length - 1 &&
            [
              highestGainRow.tunda,
              highestGainRow.tidak,
              highestGainRow.ya,
            ].filter((el) => el > 0).length > 1
          ) {
            const strongDecision = Math.max.apply(Math, [
              highestGainRow.tunda,
              highestGainRow.tidak,
              highestGainRow.ya,
            ]);
            if (
              [
                highestGainRow.tunda,
                highestGainRow.tidak,
                highestGainRow.ya,
              ].filter((el) => el == strongDecision).length == 1
            ) {
              const decisionIndex = [
                highestGainRow.tunda,
                highestGainRow.tidak,
                highestGainRow.ya,
              ]
                .map((el) => el == strongDecision)
                .indexOf(true);
              switch (decisionIndex) {
                case 0:
                  decision = 'TUNDA';
                  break;
                case 1:
                  decision = 'TIDAK';
                  break;
                case 2:
                  decision = 'YA';
                  break;
                default:
                  break;
              }
            }
          }

          if (
            [
              highestGainRow.tunda,
              highestGainRow.tidak,
              highestGainRow.ya,
            ].filter((el) => el == 0).length == 2 ||
            (i == processedTables.length - 1 &&
              [
                highestGainRow.tunda,
                highestGainRow.tidak,
                highestGainRow.ya,
              ].filter((el) => el > 0).length > 1)
          ) {
            const condition = `${nodeString}${parameter} ${criteria}`;
            const properties = {
              condition: condition,
              decision: decision,
            };

            for (const parameter of parameters) {
              const name =
                parameter.name.charAt(0).toLowerCase() +
                parameter.name.replace(' ', '').slice(1);
              properties[name] = 'TIDAK BISA MEMUTUSKAN';
            }

            for (const [i, nodeParameter] of Object.entries(nodeParameters)) {
              properties[nodeParameter] = nodeCriterias[i];
            }
            properties[
              parameter.charAt(0).toLowerCase() +
                parameter.replace(' ', '').slice(1)
            ] = criteria;

            decisionTree.push(properties);
          }
        }
      }
    }
  }
  // sort decision tree
  decisionTree.sort((a, b) => a.condition.localeCompare(b.condition));
  // console.log(decisionTree);
};

// decide decision based on user input
// lamaUsaha, jumlahPekerja, omzet, jumlahAset : int
const getDecision = (lamaUsaha, jumlahPekerja, omzet, jumlahAset) => {
  let lamaUsahaCriteria = '';
  let jumlahPekerjaCriteria = '';
  let omzetCriteria = '';
  let jumlahAsetCriteria = '';
  for (const rule of rules) {
    for (const [parameter, criteria] of Object.entries(rule)) {
      const splittedCriteria = criteria.split(' ');
      if (splittedCriteria.length == 2) {
        if (splittedCriteria[0] == '<') {
          switch (parameter) {
            case 'lamaUsaha':
              lamaUsahaCriteria =
                lamaUsaha < parseInt(splittedCriteria[1])
                  ? criteria
                  : lamaUsahaCriteria;
              break;
            case 'jumlahPekerja':
              jumlahPekerjaCriteria =
                jumlahPekerja < parseInt(splittedCriteria[1])
                  ? criteria
                  : jumlahPekerjaCriteria;
              break;
            case 'omzet':
              omzetCriteria =
                omzet < parseInt(splittedCriteria[1])
                  ? criteria
                  : omzetCriteria;
              break;
            case 'jumlahAset':
              jumlahAsetCriteria =
                jumlahAset < parseInt(splittedCriteria[1])
                  ? criteria
                  : jumlahAsetCriteria;
              break;
            default:
              break;
          }
        } else if (splittedCriteria[0] == '>') {
          switch (parameter) {
            case 'lamaUsaha':
              lamaUsahaCriteria =
                lamaUsaha > parseInt(splittedCriteria[1])
                  ? criteria
                  : lamaUsahaCriteria;
              break;
            case 'jumlahPekerja':
              jumlahPekerjaCriteria =
                jumlahPekerja > parseInt(splittedCriteria[1])
                  ? criteria
                  : jumlahPekerjaCriteria;
              break;
            case 'omzet':
              omzetCriteria =
                omzet > parseInt(splittedCriteria[1])
                  ? criteria
                  : omzetCriteria;
              break;
            case 'jumlahAset':
              jumlahAsetCriteria =
                jumlahAset > parseInt(splittedCriteria[1])
                  ? criteria
                  : jumlahAsetCriteria;
              break;
            default:
              break;
          }
        }
      } else if (splittedCriteria.length == 3) {
        switch (parameter) {
          case 'lamaUsaha':
            lamaUsahaCriteria =
              lamaUsaha >= parseInt(splittedCriteria[0]) &&
              lamaUsaha <= parseInt(splittedCriteria[2])
                ? criteria
                : lamaUsahaCriteria;
            break;
          case 'jumlahPekerja':
            jumlahPekerjaCriteria =
              jumlahPekerja >= parseInt(splittedCriteria[0]) &&
              jumlahPekerja <= parseInt(splittedCriteria[2])
                ? criteria
                : jumlahPekerjaCriteria;
            break;
          case 'omzet':
            omzetCriteria =
              omzet >= parseInt(splittedCriteria[0]) &&
              omzet <= parseInt(splittedCriteria[2])
                ? criteria
                : omzetCriteria;
            break;
          case 'jumlahAset':
            jumlahAsetCriteria =
              jumlahAset >= parseInt(splittedCriteria[0]) &&
              jumlahAset <= parseInt(splittedCriteria[2])
                ? criteria
                : jumlahAsetCriteria;
            break;
          default:
            break;
        }
      }
    }

    if (
      lamaUsahaCriteria != '' &&
      jumlahPekerjaCriteria != '' &&
      omzetCriteria != '' &&
      jumlahAsetCriteria != ''
    ) {
      break;
    }
  }

  let decision = 'TIDAK BISA MEMUTUSKAN';
  for (const branch of decisionTree) {
    const resultConditions = branch.condition.split(' & ');
    const resultParameters = resultConditions.map((el) =>
      el.slice(0, el.indexOf(' ')),
    );
    const decide = [];

    for (const parameter of resultParameters) {
      switch (parameter) {
        case 'lamaUsaha':
          branch[parameter] == lamaUsahaCriteria
            ? decide.push(true)
            : decide.push(false);
          break;
        case 'jumlahPekerja':
          branch[parameter] == jumlahPekerjaCriteria
            ? decide.push(true)
            : decide.push(false);
          break;
        case 'omzet':
          branch[parameter] == omzetCriteria
            ? decide.push(true)
            : decide.push(false);
          break;
        case 'jumlahAset':
          branch[parameter] == jumlahAsetCriteria
            ? decide.push(true)
            : decide.push(false);
          break;
        default:
          break;
      }
    }

    if (decide.every((el) => el == true)) {
      decision = branch.decision;
    }
  }
  // console.log(decision);
  return decision;
};

// process data testing
export const processDataTesting = () => {
  const input1 = document.querySelector('input[name="lamaUsaha"]');
  const input2 = document.querySelector('input[name="jumlahPekerja"]');
  const input3 = document.querySelector('input[name="omzet"]');
  const input4 = document.querySelector('input[name="jumlahAset"]');
  const output = document.querySelector('input[name="result"]');

  let lamaUsaha = 0;
  let jumlahPekerja = 0;
  let omzet = 0;
  let jumlahAset = 0;

  const decision = getDecision(lamaUsaha, jumlahPekerja, omzet, jumlahAset);
  output.value = decision;

  input1.addEventListener('input', () => {
    if (input1.value === '' || input1.value < 0) input1.value = 0;
    lamaUsaha = parseInt(input1.value);
    const decision = getDecision(lamaUsaha, jumlahPekerja, omzet, jumlahAset);
    output.value = decision;
  });

  input2.addEventListener('input', () => {
    if (input2.value === '' || input2.value < 0) input2.value = 0;
    jumlahPekerja = parseInt(input2.value);
    const decision = getDecision(lamaUsaha, jumlahPekerja, omzet, jumlahAset);
    output.value = decision;
  });

  input3.addEventListener('input', () => {
    if (input3.value === '' || input3.value < 0) input3.value = 0;
    omzet = parseInt(input3.value);
    const decision = getDecision(lamaUsaha, jumlahPekerja, omzet, jumlahAset);
    output.value = decision;
  });

  input4.addEventListener('input', () => {
    if (input4.value === '' || input4.value < 0) input4.value = 0;
    jumlahAset = parseInt(input4.value);
    const decision = getDecision(lamaUsaha, jumlahPekerja, omzet, jumlahAset);
    output.value = decision;
  });
};
