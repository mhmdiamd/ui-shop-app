import React from 'react';

export const SectionContent = ({ id, title, description, children }) => {
  return (
    <div id={id} className="mt-5 section-content">
      <div className="new-product-title d-grid mb-3">
        <span className="fs-3 fw-bold">{title}</span>
        <span className="text-secondary helper-text">{description}</span>
      </div>

      <div className="col-12 product product-content gap-3">{children}</div>
    </div>
  );
};
