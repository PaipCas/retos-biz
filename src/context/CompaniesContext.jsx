import axios from 'axios';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { DashboardContext } from './DashboardContext';

const CompaniesContext = createContext();

function CompaniesProvider({ children }) {
    const { markAsUpdated } = useContext(DashboardContext);
    const [empresas, setEmpresas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sector, setSector] = useState('');
    const [activaFilter, setActivaFilter] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingEmpresa, setEditingEmpresa] = useState(null); // Guarda la empresa que se está editando
    
    const { register, handleSubmit, reset, setValue, formState: { errors, isSubmitting } } = useForm();

    useEffect(() => {
        axios.get('http://localhost:3001/api/empresas')
            .then(response => setEmpresas(response.data))
            .catch(error => {
                console.error(error);
                toast.error('No se pudieron cargar las empresas');
            })
            .finally(() => setLoading(false));
    }, []);

    const sectores = [...new Set(empresas.map(empresa => empresa.sector).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'es'));

const filteredEmpresas = empresas.filter(empresa => {
        const matchesSearch = 
            empresa.nombre?.toLowerCase().includes(search.trim().toLowerCase()) ||
            empresa.nit?.toString().includes(search.trim()) ||
            empresa.correo?.toLowerCase().includes(search.trim().toLowerCase());

        const matchesSector = !sector || empresa.sector === sector;
        
        // Corrección aquí: Compara si coincide el 1/0 de la base de datos con el "true"/"false" del select
        const matchesActiva = 
            activaFilter === '' || 
            (activaFilter === 'true' && (empresa.activa === 1 || empresa.activa === true)) ||
            (activaFilter === 'false' && (empresa.activa === 0 || empresa.activa === false));

        return matchesSearch && matchesSector && matchesActiva;
    });

    const hasFilters = search.trim() !== '' || sector !== '' || activaFilter !== '';

    // Abre el modal para CREAR
    const openCreateModal = () => {
        setEditingEmpresa(null);
        reset({ nit: '', nombre: '', sector: '', contacto: '', correo: '', telefono: '', activa: true });
        setShowModal(true);
    };

    // Abre el modal para EDITAR cargando los datos en el formulario
    const onEdit = empresa => {
        setEditingEmpresa(empresa);
        setValue('nit', empresa.nit || '');
        setValue('nombre', empresa.nombre || '');
        setValue('sector', empresa.sector || '');
        setValue('contacto', empresa.contacto || '');
        setValue('correo', empresa.correo || '');
        setValue('telefono', empresa.telefono || '');
        setValue('activa', empresa.activa ?? true);
        setShowModal(true);
    };

    const closeModal = useCallback(() => {
        setShowModal(false);
        setEditingEmpresa(null);
        reset();
    }, [reset]);

    // Función unificada para Crear o Editar según corresponda
    const onSubmitForm = async data => {
        if (editingEmpresa) {
            // EDITAR (PUT)
            try {
                const response = await axios.put(`http://localhost:3001/api/empresas/${editingEmpresa.id}`, {
                    nit: data.nit.trim(),
                    nombre: data.nombre.trim(),
                    sector: data.sector?.trim() || null,
                    contacto: data.contacto?.trim() || null,
                    correo: data.correo?.trim().toLowerCase() || null,
                    telefono: data.telefono?.trim() || null,
                    activa: data.activa,
                });

                setEmpresas(prev => prev.map(item => item.id === editingEmpresa.id ? response.data : item));
                markAsUpdated();
                toast.success('Empresa actualizada', { description: response.data.nombre });
                closeModal();
            } catch (error) {
                console.error(error);
                toast.error('No se pudo actualizar la empresa', { description: 'Intenta de nuevo más tarde' });
            }
        } else {
            // CREAR (POST)
            try {
                const response = await axios.post('http://localhost:3001/api/empresas', {
                    nit: data.nit.trim(),
                    nombre: data.nombre.trim(),
                    sector: data.sector?.trim() || null,
                    contacto: data.contacto?.trim() || null,
                    correo: data.correo?.trim().toLowerCase() || null,
                    telefono: data.telefono?.trim() || null,
                    activa: data.activa ?? true,
                });

                setEmpresas(prev => [...prev, response.data]);
                markAsUpdated();
                toast.success('Empresa creada', { description: response.data.nombre });
                closeModal();
            } catch (error) {
                console.error(error);
                const isDuplicated = error.response?.data?.error?.includes('Duplicate');
                toast.error('No se pudo crear la empresa', { 
                    description: isDuplicated ? 'Ya existe una empresa con este NIT o correo' : 'Intenta de nuevo más tarde' 
                });
            }
        }
    };

    const onCreate = handleSubmit(onSubmitForm);

    const deleteEmpresa = async empresa => {
        try {
            await axios.delete(`http://localhost:3001/api/empresas/${empresa.id}`);
            setEmpresas(prev => prev.filter(item => item.id !== empresa.id));
            markAsUpdated();
            toast.success('Empresa eliminada', { description: empresa.nombre });
        } catch (error) {
            console.error(error);
            toast.error('No se pudo eliminar la empresa', { description: 'Verifica que no tenga registros o solicitudes asociadas' });
        }
    };

    const onDelete = empresa => {
        toast.warning(`¿Eliminar la empresa "${empresa.nombre}"?`, {
            description: 'Esta acción no se puede deshacer',
            action: { label: 'Eliminar', onClick: () => deleteEmpresa(empresa) },
            cancel: { label: 'Cancelar', onClick: () => {} },
        });
    };

    return (
        <CompaniesContext.Provider value={{ 
            filteredEmpresas, 
            loading, 
            search, 
            setSearch, 
            sector, 
            setSector, 
            sectores, 
            activaFilter,
            setActivaFilter,
            hasFilters, 
            onEdit, 
            onDelete, 
            showModal, 
            openCreateModal, 
            closeModal, 
            register, 
            errors, 
            isSubmitting, 
            onCreate,
            editingEmpresa
        }}>
            {children}
        </CompaniesContext.Provider>
    );
}

export { CompaniesContext, CompaniesProvider };