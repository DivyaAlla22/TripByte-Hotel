import React from "react"
import { Link } from "react-router-dom"
import { FaEdit, FaBookOpen } from "react-icons/fa" // Make sure to install react-icons

const Admin = () => {
	return (
		<section className="container mt-5">
			<h2 className="hotel-color mb-4">Welcome to Admin Panel</h2>
			<hr />
			
			<div className="row g-4 mt-2">
				{/* Manage Rooms Card */}
				<div className="col-md-6 col-lg-4">
					<div className="card admin-card h-100 text-center p-4 border-0 shadow-sm">
						<div className="card-body">
							<div className="admin-icon-wrapper mb-3">
								<FaEdit size={40} className="hotel-color" />
							</div>
							<h4 className="fw-bold">Rooms</h4>
							<p className="text-muted small">Add, edit, or delete hotel room listings.</p>
							<Link to={"/existing-rooms"} className="btn btn-hotel w-100 mt-2">
								Manage Rooms
							</Link>
						</div>
					</div>
				</div>

				{/* Manage Bookings Card */}
				<div className="col-md-6 col-lg-4">
					<div className="card admin-card h-100 text-center p-4 border-0 shadow-sm">
						<div className="card-body">
							<div className="admin-icon-wrapper mb-3">
								<FaBookOpen size={40} className="hotel-color" />
							</div>
							<h4 className="fw-bold">Bookings</h4>
							<p className="text-muted small">View and manage all customer reservations.</p>
							<Link to={"/existing-bookings"} className="btn btn-hotel w-100 mt-2">
								Manage Bookings
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}

export default Admin