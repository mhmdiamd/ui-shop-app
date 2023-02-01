import React from 'react';

export const DashboardCardContent = ({ title, description, children }) => {
  return (
    <section className="row border border ms-1 rounded mb-4 card-content">
      <div className="col-12 py-3 ps-4 border-2 border-bottom">
        <span className="d-block fw-semibold fs-4">{title}</span>
        <span className="color-trinary">{description ? description : ''}</span>
      </div>

      <div className="col-12 px-4 py-4">
        <div className="row">{children}</div>
      </div>
    </section>
  );
};
