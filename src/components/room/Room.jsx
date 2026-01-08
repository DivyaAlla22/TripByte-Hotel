import React, { useEffect, useState } from "react"
import { getAllRooms } from "../utils/ApiFunctions"
import RoomCard from "./RoomCard"
import { Col, Container, Row } from "react-bootstrap"
import RoomFilter from "../common/RoomFilter"
import RoomPaginator from "../common/RoomPaginator"

const Room = () => {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [roomsPerPage] = useState(6)
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    setIsLoading(true)
    getAllRooms()
      .then((data) => {
        setData(data)
        setFilteredData(data)
        setIsLoading(false)
      })
      .catch((error) => {
        setError(error.message)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <div>Loading rooms.....</div>
  }
  if (error) {
    return <div className="text-danger text-center mt-5">Error: {error}</div>
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const totalPages = Math.ceil(filteredData.length / roomsPerPage)

  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPerPage
    const endIndex = startIndex + roomsPerPage
    return filteredData
      .slice(startIndex, endIndex)
      .map((room) => <RoomCard key={room.id} room={room} />)
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col md={6}>
          {/* This renders the "Filter by Type" dropdown */}
          <RoomFilter data={data} setFilteredData={setFilteredData} />
        </Col>
      </Row>

      <Row>{renderRooms()}</Row>

      <Row className="mt-4">
        <Col className="d-flex justify-content-center">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  )
}

export default Room