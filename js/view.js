import {
  dom,
  rules,
  datasets,
  parameters,
  processedTables,
  decisionTree,
} from './model.js';
import { easeInOutBack } from '../node_modules/es6-easings/lib/index.js';
import { animatedScrollTo } from '../node_modules/es6-scroll-to/lib/index.js';

// tableName = model.dom.tableClassification || model.dom.tableDataset
// datas = model.rules || model.datasets
export const renderTable = (table, datas) => {
  let string = '';
  switch (datas) {
    case rules:
      for (const data of datas) {
        string += `
                    <div class="row rule">
                        <div class="cell" data-title="Lama Usaha">
                            ${data.lamaUsaha}
                        </div>
                        <div class="cell" data-title="Jumlah Pekerja">
                            ${data.jumlahPekerja}
                        </div>
                        <div class="cell" data-title="Omzet">
                            ${data.omzet}
                        </div>
                        <div class="cell" data-title="Jumlah Aset">
                            ${data.jumlahAset}
                        </div>
                    </div>
                `;
      }
      break;
    case datasets:
      for (const data of datas) {
        string += `
                    <div class="row dataset">
                        <div class="cell" data-title="Nama UKM">
                            ${data.namaUKM}
                        </div>
                        <div class="cell" data-title="Lama Usaha">
                            ${data.lamaUsaha}
                        </div>
                        <div class="cell" data-title="Jumlah Pekerja">
                            ${data.jumlahPekerja}
                        </div>
                        <div class="cell" data-title="Omzet">
                            ${data.omzet}
                        </div>
                        <div class="cell" data-title="Jumlah Aset">
                            ${data.jumlahAset}
                        </div>
                        <div class="cell" data-title="Hasil Keputusan">
                            ${data.keputusan}
                        </div>
                    </div>
                `;
      }
      break;
    default:
      break;
  }
  table.insertAdjacentHTML('beforeend', string);
};

// processedTables: model.processedTable
const renderProcessedTables = (processedTables) => {
  let target = '';

  for (const [stepIndex, step] of Object.entries(processedTables)) {
    const title = `
            <div id="step-${
              parseInt(stepIndex) + 1
            }-container" class="wrap-table100 mt-5">
                <h2>${step.title}</h2>
            </div>
        `;
    dom.tableContainer.insertAdjacentHTML('beforeend', title);

    for (const [tableIndex, tableRows] of Object.entries(step.tables)) {
      let content = '';
      const domTable = `
                <div class="wrap-table100 mt-3">
                    <div class="table process step-${stepIndex}-table-${tableIndex}">
                    </div>
                </div>
            `;

      dom.tableContainer.insertAdjacentHTML('beforeend', domTable);
      target = document.querySelector(
        `.table.process.step-${stepIndex}-table-${tableIndex}`,
      );

      content += `
                <div class="row header process">
                    <div class="cell">
                    </div>
                    <div class="cell">
                    </div>
                    <div class="cell">
                        JUMLAH KASUS
                    </div>
                    <div class="cell">
                        TUNDA (S1)
                    </div>
                    <div class="cell">
                        TIDAK (S2)
                    </div>
                    <div class="cell">
                        YA (S3)
                    </div>
                    <div class="cell">
                        ENTROPY
                    </div>
                    <div class="cell">
                        GAIN
                    </div>
                </div>
            `;

      for (const tableRow of tableRows) {
        const parameter = tableRow.parameter
          .split(' & ')
          .map((el) =>
            el
              .split(/(?=[A-Z])/)
              .map((el) => el.charAt(0).toUpperCase() + el.slice(1))
              .join(' '),
          )
          .join(' & ');

        content += `
                        <div class="row process">
                            <div class="cell" data-title="Parameter">
                                ${parameter}
                            </div>
                            <div class="cell" data-title="Kriteria">
                                ${tableRow.kriteria}
                            </div>
                            <div class="cell" data-title="Jumlah Kasus">
                                ${tableRow.jumlahKasus}
                            </div>
                            <div class="cell" data-title="Tunda">
                                ${tableRow.tunda}
                            </div>
                            <div class="cell" data-title="Tidak">
                                ${tableRow.tidak}
                            </div>
                            <div class="cell" data-title="Ya">
                                ${tableRow.ya}
                            </div>
                            <div class="cell" data-title="Entropy">
                                ${tableRow.entropy}
                            </div>
                            <div class="cell" data-title="Gain">
                                ${tableRow.gain}
                            </div>
                        </div>
                    `;
      }

      target.insertAdjacentHTML('beforeend', content);
    }
  }
};

// render decision tree to UI
const renderDecisionTree = () => {
  // create table
  const table = `
            <div class="wrap-table100 mt-5">
                <h2>GENERATED RULES</h2>
            </div>
            <div class="wrap-table100 mt-3">
                <div class="table decision-tree">
                    <div class="row header decision-tree">
                        <div class="cell">
                            RULES
                        </div>
                        <div class="cell">
                            KEPUTUSAN
                        </div>
                    </div>
                </div>
            </div>
        `;
  dom.tableContainer.insertAdjacentHTML('beforeend', table);

  // add table's content
  let content = '';
  for (const rule of decisionTree) {
    content += `
            <div class="row process">
                <div class="cell text-left" data-title="Rules" style="padding-left: 40px;">
                    ${rule.condition}
                </div>
                <div class="cell" data-title="Keputusan">
                    ${rule.decision}
                </div>
            </div>
        `;
  }
  document
    .querySelector('.table.decision-tree')
    .insertAdjacentHTML('beforeend', content);
};

// render form for testing decision
const renderTestForm = () => {
  const container = `
        <div id="result-container" class="wrap-table100 mt-5">
            <h2 class="text-center">DEMONSTRASI PENGUJIAN</h2>
        </div>
    `;
  dom.tableContainer.insertAdjacentHTML('beforeend', container);

  let formHeader = '';
  for (const parameter of parameters) {
    formHeader += `
            <td class="text-center" style="width: 20%">
                ${parameter.name}
            </td>
        `;
  }
  formHeader += `
        <td class="text-center" style="width: 20%">
            Keputusan (Read Only)
        </td>
    `;

  const tableForm = `
        <table id="result-form-table" class="mt-4 w-100">
            <tr>
                ${formHeader}
            </tr>
        </table>
    `;
  dom.tableContainer.insertAdjacentHTML('beforeend', tableForm);

  let formInput = '<tr>';
  for (const parameter of parameters) {
    const name =
      parameter.name.charAt(0).toLowerCase() +
      parameter.name.replace(' ', '').slice(1);
    formInput += `
            <td class="text-center p-3" style="width: 20%">
                <input type="number" name="${name}" value="0" class="w-100 text-right pr-3">
            </td>
        `;
  }
  formInput += `
        <td class="text-center p-3" style="width: 20%">
            <input type="text" name="result" class="w-100 text-center bg-dark text-white font-weight-bold" readonly>
        </td>
    `;
  formInput += '</tr>';
  document
    .querySelector('table#result-form-table')
    .insertAdjacentHTML('beforeend', formInput);
};

export const showProcessesOnButtonClick = async () => {
  return new Promise((resolve) => {
    dom.buttonProcess.addEventListener('click', () => {
      setTimeout(() => {
        dom.buttonProcessContainer.classList.add('fadeout');
        renderProcessedTables(processedTables);
        renderDecisionTree();
        renderTestForm();

        const scrollTo = document.querySelector('div#step-1-container')
          .offsetTop;

        animatedScrollTo({
          to: scrollTo,
          easing: easeInOutBack,
          duration: 2000,
        });
        resolve();
      }, 0);
    });
  });
};
