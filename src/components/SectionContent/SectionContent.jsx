import React from 'react';
import style from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrip } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

export const SectionContent = ({ id, title, description, children, moreLink = false }) => {
  return (
    <div id={id} className={`mt-4 ${style.sectionContent}`}>
      <div className="new-product-title d-flex justify-content-between mb-3">
        <div className="section-title d-grid">
          <span className="fs-3 fw-bold">{title}</span>
          <span className="text-secondary helper-text">{description}</span>
        </div>

        {moreLink && (
          <Link to={moreLink} className="align-items-end d-flex gap-2 text-decoration-none">
            <span className="fw-bold"> See More</span>
            <FontAwesomeIcon className="text-primary fs-4" icon={faGrip} />{' '}
          </Link>
        )}
      </div>

      <div className={`col-12 product ${style.productContent} gap-3`}>{children}</div>
    </div>
  );
};
