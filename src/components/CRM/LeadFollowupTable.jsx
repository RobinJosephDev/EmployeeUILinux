import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Table from '../common/Table';
import Modal from '../common/Modal';
import EditLeadFollowupForm from './EditFollowup/EditLeadFollowupForm';
import { EditOutlined, DeleteOutlined, PlusOutlined, SearchOutlined, EyeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import AddLeadFollowupForm from './AddFollowup/AddLeadFollowupForm';
import ViewLeadFollowupForm from './ViewFollowup/ViewLeadFollowupForm';

const LeadFollowupTable = () => {
  const [followUps, setFollowUps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFollowup, setselectedFollowup] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isViewModalOpen, setViewModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(100);
  const API_URL = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch lead follow-ups
    const fetchFollowUps = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found');
          navigate('/login');
          return;
        }

        const { data } = await axios.get(`${API_URL}/employee-followup`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data && Array.isArray(data)) {
          console.log('Fetched Follow-ups:', data);
          setFollowUps(data);
        } else {
          console.error('Unexpected data structure:', data);
          setFollowUps([]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error loading followups:', error);
        if (error.response && error.response.status === 401) {
          console.log('Token expired or invalid');
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('userRole');
          navigate('/login');
        }
        setFollowUps([]);
        setLoading(false);
      }
    };

    fetchFollowUps();
  }, []);

  const updateFollowup = (updatedFollowup) => {
    setFollowUps((prevFollowups) =>
      prevFollowups.map((followUp) => (followUp.id === updatedFollowup.id ? { ...followUp, ...updatedFollowup } : followUp))
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedData.map((followUps) => followUps.id));
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
        title: 'No follow-ups selected',
        text: 'Please select follow-ups to delete.',
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
            axios.delete(`${API_URL}/lead-followup/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
          )
        );

        setFollowUps((prevfollowUps) => prevfollowUps.filter((followUps) => !selectedIds.includes(followUps.id)));
        setSelectedIds([]);
        Swal.fire('Deleted!', 'Selected follow-ups have been deleted.', 'success');
      } catch (error) {
        console.error('Error deleting follow-ups:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: 'Failed to delete selected follow-ups.',
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

  const openEditModal = (followUp) => {
    setselectedFollowup(followUp);
    setEditModalOpen(true);
  };

  const closeEditModal = () => {
    setEditModalOpen(false);
    setselectedFollowup(null);
  };
  const openViewModal = (followUp) => {
    setselectedFollowup(followUp);
    setViewModalOpen(true);
  };

  const closeViewModal = () => {
    setViewModalOpen(false);
    setselectedFollowup(null);
  };

  const openAddModal = () => {
    setAddModalOpen(true);
  };

  const closeAddModal = () => {
    setAddModalOpen(false);
  };

  // Search filtering
  const filteredFollowUps = followUps.filter(
    (followUp) =>
      followUp.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      followUp.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      followUp.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sorting logic
  const sortedFollowUps = filteredFollowUps.sort((a, b) => {
    let valA = a[sortBy];
    let valB = b[sortBy];

    // Handle case where value is null or undefined
    if (valA == null) valA = '';
    if (valB == null) valB = '';

    if (sortBy === 'lead_date' || sortBy === 'next_follow_up_date') {
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

  const paginatedData = sortedFollowUps.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const totalPages = Math.ceil(filteredFollowUps.length / rowsPerPage);

  const headers = [
    {
      key: 'checkbox',
      label: <input type="checkbox" checked={selectedIds.length === paginatedData.length && paginatedData.length > 0} onChange={toggleSelectAll} />,
      render: (order) => <input type="checkbox" checked={selectedIds.includes(order.id)} onChange={() => toggleSelect(order.id)} />,
    },
    { key: 'lead_no', label: 'Lead#' },
    { key: 'lead_date', label: 'Date' },
    { key: 'customer_name', label: 'Customer Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'email', label: 'Email' },
    { key: 'lead_type', label: 'Lead Type' },
    {
      key: 'lead_status',
      label: 'Status',
      render: (item) => <span className={`badge ${getStatusClass(item.lead_status)}`}>{item.lead_status}</span>,
    },
    {
      key: 'edit',
      label: 'Edit',
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
      case 'New':
        return 'badge-new';
      case 'In Progress':
        return 'badge-in-progress';
      case 'Completed':
        return 'badge-completed';
      case 'On Hold':
        return 'badge-on-hold';
      case 'Lost':
        return 'badge-lost';
      default:
        return 'badge-default';
    }
  };
  return (
    <div className="lead-followup-table">
      {loading ? (
        <div className="loading-indicator">
          <span>Loading follow-ups...</span>
        </div>
      ) : (
        <>
          <div className="header-container">
            <div className="header-container-left">
              <div className="header-actions">
                <h1 className="page-heading">Follow ups</h1>
              </div>
            </div>

            <div className="search-container">
              <div className="search-input-wrapper">
                <SearchOutlined className="search-icon" />
                <input className="search-bar" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </div>
              <button onClick={openAddModal} className="add-button">
                <PlusOutlined />
              </button>
              <button onClick={deleteSelected} className="delete-button">
                <DeleteOutlined />
              </button>
            </div>
          </div>
          {followUps.length === 0 ? (
            <div className="no-data-message">No follow-up data available</div>
          ) : (
            <Table
              data={paginatedData}
              headers={headers.map((header) => ({
                ...header,
                label: (
                  <div className="sortable-header" onClick={() => handleSort(header.key)}>
                    {header.label}
                    {sortBy === header.key && <span className="sort-icon">{sortDesc ? '▲' : '▼'}</span>}
                  </div>
                ),
              }))}
              handleSort={handleSort}
              sortBy={sortBy}
              sortDesc={sortDesc}
              currentPage={currentPage}
              totalPages={totalPages}
              searchQuery={searchQuery}
              setCurrentPage={setCurrentPage}
              onEditClick={openEditModal}
            />
          )}
        </>
      )}

      {/* Edit Followup Modal */}
      <Modal isOpen={isEditModalOpen} onClose={closeEditModal} title="Edit Follow-up">
        {selectedFollowup && <EditLeadFollowupForm followUp={selectedFollowup} onClose={closeEditModal} onUpdate={updateFollowup} />}
      </Modal>

      {/* Add Lead Modal */}
      <Modal isOpen={isAddModalOpen} onClose={closeAddModal} title="Add Follow-up">
        <AddLeadFollowupForm
          onClose={closeAddModal}
          onAddFollowup={(newFollowup) => {
            setFollowUps((prevFollowups) => [...prevFollowups, newFollowup]);
            closeAddModal();
          }}
        />
      </Modal>

      <Modal isOpen={isViewModalOpen} onClose={closeViewModal} title="Follow-up Details">
        {selectedFollowup && <ViewLeadFollowupForm followUp={selectedFollowup} onClose={closeViewModal} />}
      </Modal>
    </div>
  );
};

export default LeadFollowupTable;
