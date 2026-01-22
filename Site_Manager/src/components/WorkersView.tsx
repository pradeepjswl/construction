import React, { useState, useEffect } from 'react'
import {UserCheck, UserX, MapPin, Clock, LogIn, LogOut, AlertCircle, Navigation} from 'lucide-react'
import { lumi } from '../lib/lumi'

interface Worker {
  _id: string
  name: string
  phone: string
  skills: string[]
  proficiencyLevel: string
  status: string
}

interface Attendance {
  _id: string
  workerId: string
  workerName: string
  clockIn: string
  clockOut?: string
  date: string
  geofenceStatus: string
  location?: {
    latitude: number
    longitude: number
  }
  totalHours?: number
}

const WorkersView = () => {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [attendance, setAttendance] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null)
  const [geofenceAlerts, setGeofenceAlerts] = useState<Attendance[]>([])

  // Site geofence configuration (Mumbai example coordinates)
  const SITE_CENTER = { latitude: 19.076, longitude: 72.8777 }
  const GEOFENCE_RADIUS_KM = 0.5 // 500 meters

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [workersRes, attendanceRes] = await Promise.all([
        lumi.entities.workers.list(),
        lumi.entities.attendance.list()
      ])

      setWorkers(workersRes.list || [])
      
      // Filter today's attendance
      const today = new Date().toISOString().split('T')[0]
      const todayAttendance = (attendanceRes.list || []).filter((a: Attendance) => a.date === today)
      setAttendance(todayAttendance)

      // Find geofence violations
      const alerts = todayAttendance.filter((a: Attendance) => a.geofenceStatus === 'outside')
      setGeofenceAlerts(alerts)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    // Haversine formula to calculate distance in km
    const R = 6371 // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const getCurrentLocation = (): Promise<{ latitude: number, longitude: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
        },
        (error) => reject(error),
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      )
    })
  }

  const handleClockIn = async (worker: Worker) => {
    try {
      const location = await getCurrentLocation()
      const distance = calculateDistance(
        location.latitude,
        location.longitude,
        SITE_CENTER.latitude,
        SITE_CENTER.longitude
      )
      
      const geofenceStatus = distance <= GEOFENCE_RADIUS_KM ? 'inside' : 'outside'
      const today = new Date().toISOString().split('T')[0]

      const newAttendance = {
        workerId: worker._id,
        workerName: worker.name,
        clockIn: new Date().toISOString(),
        date: today,
        geofenceStatus,
        location,
        creator: 'supervisor',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      await lumi.entities.attendance.create(newAttendance)
      await fetchData()
      
      if (geofenceStatus === 'outside') {
        alert(`⚠️ Geofence Alert: ${worker.name} clocked in ${distance.toFixed(2)}km away from site!`)
      } else {
        alert(`✅ ${worker.name} successfully clocked in!`)
      }
    } catch (error) {
      console.error('Error clocking in:', error)
      alert('Failed to get location. Please enable GPS and try again.')
    }
  }

  const handleClockOut = async (worker: Worker, attendanceRecord: Attendance) => {
    try {
      const clockOutTime = new Date()
      const clockInTime = new Date(attendanceRecord.clockIn)
      const totalHours = (clockOutTime.getTime() - clockInTime.getTime()) / (1000 * 60 * 60)

      await lumi.entities.attendance.update(attendanceRecord._id, {
        clockOut: clockOutTime.toISOString(),
        totalHours: parseFloat(totalHours.toFixed(2)),
        updatedAt: clockOutTime.toISOString()
      })

      await fetchData()
      alert(`✅ ${worker.name} clocked out! Total hours: ${totalHours.toFixed(2)}`)
    } catch (error) {
      console.error('Error clocking out:', error)
      alert('Failed to clock out. Please try again.')
    }
  }

  const getWorkerAttendance = (workerId: string): Attendance | undefined => {
    return attendance.find(a => a.workerId === workerId)
  }

  const getWorkerStatus = (worker: Worker): 'present' | 'absent' | 'late' => {
    const att = getWorkerAttendance(worker._id)
    if (!att) return 'absent'
    
    const clockInTime = new Date(att.clockIn)
    const hour = clockInTime.getHours()
    
    return hour <= 8 ? 'present' : 'late'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <span className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
          <UserCheck size={14} />
          Present
        </span>
      case 'late':
        return <span className="flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
          <Clock size={14} />
          Late
        </span>
      case 'absent':
        return <span className="flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
          <UserX size={14} />
          Absent
        </span>
      default:
        return null
    }
  }

  const getGeofenceBadge = (status: string) => {
    if (status === 'inside') {
      return <span className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
        <Navigation size={12} />
        On-site
      </span>
    }
    return <span className="flex items-center gap-1 px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
      <AlertCircle size={12} />
      Off-site
    </span>
  }

  const formatTime = (isoString: string): string => {
    const date = new Date(isoString)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading attendance data...</p>
        </div>
      </div>
    )
  }

  const activeWorkers = workers.filter(w => w.status === 'active')
  const presentCount = activeWorkers.filter(w => getWorkerStatus(w) === 'present').length
  const lateCount = activeWorkers.filter(w => getWorkerStatus(w) === 'late').length
  const absentCount = activeWorkers.filter(w => getWorkerStatus(w) === 'absent').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Worker Oversight</h2>
        <p className="text-gray-600 mt-1">Track attendance and worker assignments with geofencing</p>
      </div>

      {/* Geofence Alerts */}
      {geofenceAlerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="text-red-600 mt-0.5" size={20} />
            <div>
              <h3 className="font-semibold text-red-900">Geofence Violations Detected</h3>
              <p className="text-sm text-red-700 mt-1">
                {geofenceAlerts.length} worker(s) clocked in outside the designated site area:
              </p>
              <ul className="mt-2 space-y-1">
                {geofenceAlerts.map(alert => (
                  <li key={alert._id} className="text-sm text-red-800">
                    • <strong>{alert.workerName}</strong> at {formatTime(alert.clockIn)}
                    {alert.location && ` (${alert.location.latitude.toFixed(4)}, ${alert.location.longitude.toFixed(4)})`}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Attendance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Present</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{presentCount}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-lg">
              <UserCheck className="text-green-600" size={28} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Late</p>
              <p className="text-3xl font-bold text-amber-600 mt-1">{lateCount}</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-lg">
              <Clock className="text-amber-600" size={28} />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Absent</p>
              <p className="text-3xl font-bold text-red-600 mt-1">{absentCount}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-lg">
              <UserX className="text-red-600" size={28} />
            </div>
          </div>
        </div>
      </div>

      {/* Workers List */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Today's Attendance</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {activeWorkers.map((worker) => {
            const attendanceRecord = getWorkerAttendance(worker._id)
            const status = getWorkerStatus(worker)
            
            return (
              <div key={worker._id} className="p-5 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-semibold">
                      {worker.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{worker.name}</h4>
                      <p className="text-sm text-gray-600">{worker.proficiencyLevel} • {worker.phone}</p>
                      <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                        {attendanceRecord ? (
                          <>
                            <span className="flex items-center gap-1">
                              <Clock size={14} />
                              In: {formatTime(attendanceRecord.clockIn)}
                            </span>
                            {attendanceRecord.clockOut && (
                              <span className="flex items-center gap-1">
                                Out: {formatTime(attendanceRecord.clockOut)} ({attendanceRecord.totalHours}h)
                              </span>
                            )}
                            {getGeofenceBadge(attendanceRecord.geofenceStatus)}
                          </>
                        ) : (
                          <span className="text-gray-500">Not clocked in</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(status)}
                  </div>
                </div>
                
                {/* Skills */}
                <div className="flex items-center gap-2 ml-16 mb-3">
                  {worker.skills?.map((skill, idx) => (
                    <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded border border-blue-200">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Clock In/Out Buttons */}
                <div className="flex items-center gap-2 ml-16">
                  {!attendanceRecord ? (
                    <button
                      onClick={() => handleClockIn(worker)}
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                    >
                      <LogIn size={16} />
                      Clock In
                    </button>
                  ) : !attendanceRecord.clockOut ? (
                    <button
                      onClick={() => handleClockOut(worker, attendanceRecord)}
                      className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                    >
                      <LogOut size={16} />
                      Clock Out
                    </button>
                  ) : (
                    <span className="text-sm text-green-600 font-medium">
                      ✓ Completed for today
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default WorkersView
