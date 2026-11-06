import { useContext } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { CompaniesContext } from '../context/CompaniesContext';
import Title from '../components/container/Title';
import Table from '../components/tables/Table';
import Badge from '../components/tables/Badge';
import ActionButton from '../components/tables/ActionButton';
import CompanyToolbar from '../components/companies/CompanyToolbar';
import CompanyModal from '../components/companies/CompanyModal';
export default function CompaniesPage() {
    const { filteredEmpresas, loading, hasFilters, onEdit, onDelete } = useContext(CompaniesContext);
    const columns = [
        { key: 'nit', header: 'NIT', sortable: true, className: 'font-medium text-slate-900 tabular-nums' },
        { key: 'nombre', header: 'Nombre', sortable: true, className: 'font-semibold text-slate-900' },
        { key: 'sector', header: 'Sector', sortable: true, className: 'text-slate-600' },
        { key: 'contacto', header: 'Contacto', sortable: true, className: 'text-slate-600' },
        { key: 'correo', header: 'Correo', sortable: true, className: 'text-slate-500' },
        { key: 'telefono', header: 'Teléfono', sortable: true, className: 'tabular-nums text-slate-600' },
        { 
            key: 'activa', 
            header: 'Estado', 
            sortable: true, 
            sortValue: row => (row.activa ? 1 : 0),
            render: row => (
                <Badge color={row.activa ? 'success' : 'gray'} dot>
                    {row.activa ? 'Activa' : 'Inactiva'}
                </Badge>
            ) 
        },
        {
            key: 'acciones',
            header: 'Acciones',
            align: 'right',
            render: row => (
                <div className="flex items-center justify-end gap-1 opacity-0 group-hover/row:opacity-100 group-focus-within/row:opacity-100 transition-opacity duration-150">
                    <ActionButton icon={Pencil} label="Editar empresa" variant="edit" onClick={() => onEdit(row)} />
                    <ActionButton icon={Trash2} label="Eliminar empresa" variant="danger" onClick={() => onDelete(row)} />
                </div>
            ),
        },
    ];
    return (
        <>
            <Title 
                text='Empresas' 
                subtitle='Gestión y control de las empresas registradas en el sistema' 
            />
            <Table 
                columns={columns} 
                data={filteredEmpresas} 
                loading={loading} 
                toolbar={<CompanyToolbar />} 
                emptyMessage={hasFilters ? 'No hay empresas que coincidan con los filtros' : 'Aún no hay empresas registradas'} 
            />
            <CompanyModal />
        </>
    );
}
