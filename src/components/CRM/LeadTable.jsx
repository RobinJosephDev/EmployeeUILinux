import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import EditLeadForm from './EditLead/EditLeadForm';
import { EditOutlined, DeleteOutlined, SearchOutlined, ClockCircleOutlined, PlusOutlined, CalendarOutlined, EyeOutlined } from '@ant-design/icons';
import LeadFollowupTable from './LeadFollowupTable';
import ViewLeadForm from './ViewLead/ViewLeadForm';
import dayjs from 'dayjs';

const LeadTable = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [isFollowupModalOpen, setFollowupModalOpen] = useState(false);
  const [isFollowupLoading, setFollowupLoading] = useState(false);
  const [followupData, setFollowupData] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const API_URL = import.meta.env.VITE_API_BASE_URL;

  // Fetch leads from the API
  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const leadsResponse = await axios.get(`${API_URL}/employee-lead`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setLeads(leadsResponse.data);
        setLoading(false);
      } catch (error) {
        handleFetchError(error);
      }
    };

    fetchLeads();
  }, []);

  const handleFetchError = (error) => {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'You need to log in to access this resource.',
      });
    }
  };

  const updateLead = (updatedLead) => {
    setLeads((prevLeads) => prevLeads.map((lead) => (lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead)));
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((lead) => lead.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds((prev) => prev.filter((selectedId) => selectedId !== id));
    } else {
      setSelectedIds((prev) => [...prev, id]);
    }
  };

  const deleteSelected = async () => {
    if (selectedIds.length === 0) {
      Swal.fire({
        icon: 'warning',
        title: 'No leads selected',
        text: 'Please select leads to delete.',
      });
      return;
    }

    const confirmed = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete selected!',
      cancelButtonText: 'No, cancel!',
    });

    if (confirmed.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        await Promise.all(
          selectedIds.map((id) =>
            axios.delete(`${API_URL}/lead/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        setLeads((prevLeads) => prevLeads.filter((lead) => !selectedIds.includes(lead.id)));
        setSelectedIds([]);
        Swal.fire('Deleted!', 'Selected leads have been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting leads:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete selected leads.',
        });
      }
    }
  };

  const handleSort = (column) => {
    if (column === 'checkbox') return;
    if (sortBy === column) {
      setSortDesc(!sortDesc);
    } else {
      setSortBy(column);
      setSortDesc(true);
    }
  };

  // Filter leads based on search query
  const normalizedSearchQuery = searchQuery.toLowerCase();
  const filteredLeads = leads.filter((lead) =>
    Object.values(lead).some((val) => val !== null && val !== undefined && val.toString().toLowerCase().includes(normalizedSearchQuery))
  );

  const sortedLeads = filteredLeads.sort((a, b) => {
    // Handle sorting for different data types
    let valA = a[sortBy];
    let valB = b[sortBy];

    // Handle case where value is null or undefined
    if (valA == null) valA = '';
    if (valB == null) valB = '';

    if (sortBy === 'lead_date' || sortBy === 'follow_up_date') {
      // Handle date sorting by comparing timestamps
      valA = new Date(valA).getTime();
      valB = new Date(valB).getTime();
    }

    if (typeof valA === 'string') {
      // Sort strings alphabetically
      return sortDesc ? valB.localeCompare(valA) : valA.localeCompare(valB);
    }

    // Default number sorting
    return sortDesc ? valB - valA : valA - valB;
  });

  const paginatedData = sortedLeads.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);

  const openFollowupModal = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'You need to log in to access follow-up data.',
      });
      return;
    }

    setFollowupLoading(true);

    try {
      const response = await axios.get(`${API_URL}/employee-followup`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFollowupData(response.data);
    } catch (error) {
      console.error('Error fetching follow-up data:', error);
    }

    setFollowupModalOpen(true);
  };

  const closeFollowupModal = () => {
    setFollowupModalOpen(false);
  };

  const openViewModal = (lead) => {
    setSelectedLead(lead);
    setViewModalOpen(true);
  };
  const closeViewModal = () => {
    setViewModalOpen(false);
    setSelectedLead(null);
  };
  const openEditModal = (lead) => {
    setSelectedLead(lead);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setSelectedLead(null);
  };
  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };
  const renderSortableHeader = (header) => {
    // Define columns that should not have a sort icon
    const nonSortableColumns = ['checkbox', 'actions'];

    // Only render sort icons for sortable columns
    if (nonSortableColumns.includes(header.key)) {
      return <div className="sortable-header">{header.label}</div>;
    }

    const isSortedColumn = sortBy === header.key; // Check if this column is sorted
    const sortDirection = isSortedColumn
      ? sortDesc
        ? '▼'
        : '▲' // If sorted, show descending (▼) or ascending (▲)
      : '▲'; // Default to ascending (▲) if not sorted

    return (
      <div className="sortable-header" onClick={() => handleSort(header.key)}>
        {header.label}
        <span className="sort-icon">{sortDirection}</span> {/* Always show an arrow for sortable columns */}
      </div>
    );
  };

  const headers = [
    {
      key: 'checkbox',
      label: (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <input type="checkbox" checked={selectedIds.length === paginatedData.length && paginatedData.length > 0} onChange={toggleSelectAll} />
        </div>
      ),
      render: (lead) => <input type="checkbox" checked={selectedIds.includes(lead.id)} onChange={() => toggleSelect(lead.id)} />,
    },

    { key: 'lead_no', label: 'Lead#' },
    { key: 'customer_name', label: 'Name' },
    {
      key: 'lead_date',
      label: 'Date',
      render: (item) => (
        <div className="date-picker-container-normal">
          <CalendarOutlined style={{ marginRight: 5 }} />
          {item.lead_date ? dayjs(item.lead_date).format('DD MMM, YYYY') : '-'}
        </div>
      ),
    },
    {
      key: 'city',
      label: 'City',
    },
    { key: 'lead_type', label: 'Type' },
    {
      key: 'assigned_to',
      label: 'Assigned To',
      render: (item) => <span>{item.assigned_to ? item.assigned_to : 'Unassigned'}</span>,
    },
    {
      key: 'lead_status',
      label: 'Status',
      render: (item) => <span className={`badge ${getStatusClass(item.lead_status)}`}>{item.lead_status}</span>,
    },
    {
      key: 'follow_up_date',
      label: 'Follow Up',
      render: (item) => (
        <div className="date-picker-container">
          <CalendarOutlined style={{ marginRight: 5 }} />
          {item.follow_up_date ? dayjs(item.follow_up_date).format('DD MMM, YYYY') : '-'}
        </div>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: (item) => (
        <>
          <button onClick={() => openViewModal(item)} className="btn-view">
            <EyeOutlined />
          </button>
          <button onClick={() => openEditModal(item)} className="btn-edit">
            <EditOutlined />
          </button>
        </>
      ),
    },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Prospect':
        return 'badge-prospect';
      case 'Lanes discussed':
        return 'badge-lanes';
      case 'Prod/Equip noted':
        return 'badge-product';
      case 'E-mail sent':
        return 'badge-email';
      case 'Portal registration':
        return 'badge-carrier';
      case 'Quotations':
        return 'badge-quotation';
      case 'Fob/Have broker':
        return 'badge-broker';
      case 'VM/No answer':
        return 'badge-voicemail';
      case 'Diff Dept.':
        return 'badge-different';
      case 'No reply':
        return 'badge-callback';
      case 'Not Int.':
        return 'badge-not-interested';
      case 'Asset based':
        return 'badge-asset';
      default:
        return 'badge-default';
    }
  };

  return (
    <div>
      <div className="header-container">
        <div className="header-container-left">
          <div className="header-actions">
            <h1 className="page-heading">Leads</h1>
          </div>
        </div>

        <div className="search-container">
          <div className="search-input-wrapper">
            <SearchOutlined className="search-icon" />
            <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <button onClick={openFollowupModal} className="view-fu-button">
            <ClockCircleOutlined />
          </button>
          <button onClick={openAddModal} className="add-button">
            <PlusOutlined />
          </button>
          <button onClick={deleteSelected} className="delete-button">
            <DeleteOutlined />
          </button>
        </div>
      </div>

      {/* Table component to display leads */}
      <Table
        data={paginatedData}
        headers={headers.map((header) => ({
          ...header,
          label: renderSortableHeader(header), // Render sortable header logic
        }))}
        loading={loading}
        handleSort={handleSort}
        sortBy={sortBy}
        sortDesc={sortDesc}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        onEditClick={openEditModal}
      />

      {/* Edit Lead Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Lead">
        {selectedLead && <EditLeadForm lead={selectedLead} onClose={closeEditModal} onUpdate={updateLead} />}
      </Modal>

      {/* Modal for follow-up */}
      <Modal isOpen={isFollowupModalOpen} onClose={closeFollowupModal}>
        <LeadFollowupTable followupData={followupData} loading={isFollowupLoading} />
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={closeViewModal} title="Lead Details">
        {selectedLead && <ViewLeadForm lead={selectedLead} onClose={closeViewModal} />}
      </Modal>
    </div>
  );
};

export default LeadTable;
