import 'jquery/dist/jquery.min.js';
import 'datatables.net-dt/js/dataTables.dataTables';
import 'datatables.net-dt/css/jquery.dataTables.min.css';
import 'datatables.net-buttons/js/dataTables.buttons.js';
import 'datatables.net-buttons/js/buttons.colVis.js';
import 'datatables.net-buttons/js/buttons.flash.js';
import 'datatables.net-buttons/js/buttons.html5.js';
import 'datatables.net-buttons/js/buttons.print.js';
import $ from 'jquery';
import React, { useEffect } from 'react';

export const Datatable = ({ children, data }) => {
  function getObjProperty(data) {
    const property = [];
    for (let i in data) {
      property.push(i);
    }

    return property;
  }

  useEffect(() => {
    setTimeout(() => {
      $(document).ready(function () {
        $('#table').DataTable({
          pagingType: 'full_numbers',
          pageLength: 10,
          processing: true,
          dom: 'Bfrtip',
          select: {
            style: 'single',
          },

          buttons: [
            {
              extend: 'pageLength',
              className: 'btn btn-secondary bg-secondary',
            },
            {
              extend: 'copy',
              className: 'btn btn-secondary bg-secondary',
            },
            {
              extend: 'csv',
              className: 'btn btn-secondary bg-secondary',
            },
            {
              extend: 'print',
              customize: function (win) {
                $(win.document.body).css('font-size', '10pt');
                $(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
              },
              className: 'btn btn-secondary bg-secondary',
            },
          ],

          fnRowCallback: function (nRow, aData, iDisplayIndex, iDisplayIndexFull) {
            var index = iDisplayIndexFull + 1;
            $('td:first', nRow).html(index);
            return nRow;
          },

          lengthMenu: [
            [10, 20, 30, 50, -1],
            [10, 20, 30, 50, 'All'],
          ],
          columnDefs: [
            {
              targets: 0,
              render: function (data, type, row, meta) {
                return type === 'export' ? meta.row + 1 : data;
              },
            },
          ],
          bDestroy: true,
        });
      });
    }, 1000);
  }, []);

  return (
    <table id="table" className="table align-items-center justify-content-center mb-0">
      <thead>
        <tr>
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">S/N</th>
          {getObjProperty(data[0]).map((attr, i) => (
            <th key={i} className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">
              {attr}
            </th>
          ))}
          <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Operation</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
