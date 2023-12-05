import React from 'react';

import './Categories.scss';
import CategoriesTable from 'components/CategoriesTable/CategoriesTable';

const Categories : React.FC = () => {
    return (
        <div className="inner-content">
            <CategoriesTable />
        </div>  
    )
}

export default Categories;