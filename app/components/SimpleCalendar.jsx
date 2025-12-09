"use client"

import * as React from "react"

export const SimpleCalendar = ({
  value,
  onChange,
  className = "",
}) => {
  const today = new Date()

  const [selected, setSelected] = React.useState(value ?? null)
  const [viewDate, setViewDate] = React.useState(() => {
    if (value) return new Date(value.getFullYear(), value.getMonth(), 1)
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  React.useEffect(() => {
    if (value) {
      setSelected(value)
      setViewDate(new Date(value.getFullYear(), value.getMonth(), 1))
    }
  }, [value])

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()

  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const startWeekday = firstDay.getDay()
  const daysInMonth = lastDay.getDate()

  const cells = []

  for (let i = 0; i < startWeekday; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)

  const weeks = []
  for (let i = 0; i < cells.length; i += 7) {
    weeks.push(cells.slice(i, i + 7))
  }

  const isSameDay = (a, b) => {
    if (!a || !b) return false
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    )
  }

  const handleSelect = (date) => {
    setSelected(date)
    onChange?.(date)
  }

  const goPrev = () => {
    setViewDate(new Date(year, month - 1, 1))
  }

  const goNext = () => {
    setViewDate(new Date(year, month + 1, 1))
  }

  const label = `${month + 1}월`
  const weekdays = ["일", "월", "화", "수", "목", "금", "토"]

  return (
    <div className={`w-fit rounded-[20px] bg-white p-4 ${className} shadow-[0_4px_4px_2px_rgba(0,0,0,0.08)]`}>
      <div className="mb-3 flex items-center justify-start">
        <button
          type="button"
          onClick={goPrev}
          className="rounded-md px-2 py-1 text-sm hover:bg-black/5"
        >
          <img src="icon/leftArrow2.svg" />
        </button>
        <div className="text-sm font-medium">{label}</div>
        <button
          type="button"
          onClick={goNext}
          className="rounded-md px-2 py-1 text-sm hover:bg-black/5"
        >
          <img src="icon/leftArrow2.svg" className="rotate-180"/>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {weekdays.map((w) => (
          <div
            key={w}
            className="flex h-8 w-8 items-center justify-center font-pretendard font-medium text-black"
          >
            {w}
          </div>
        ))}

        {weeks.map((week, wi) =>
          week.map((date, di) => {
            const key = `${wi}-${di}`

            if (!date) {
              return <div key={key} className="h-8 w-8" />
            }

            const isToday = isSameDay(date, today)
            const isSelected = isSameDay(date, selected)

            return (
              <button
                key={key}
                type="button"
                onClick={() => handleSelect(date)}
                className={[
                  "flex h-8 w-8 items-center justify-center rounded-md font-pretendard font-medium transition",
                  "hover:bg-black/5",
                  isToday ? "border border-blue-400" : "",
                  isSelected ? "bg-blue-500 text-white hover:bg-blue-500" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {date.getDate()}
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
