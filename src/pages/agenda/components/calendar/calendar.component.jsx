import * as React from 'react';
import dayjs from 'dayjs';
import isBetweenPlugin from 'dayjs/plugin/isBetween';
import 'dayjs/locale/pt-br';
import { styled } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';

dayjs.extend(isBetweenPlugin);
dayjs.locale('pt-br');

const CustomPickersDay = styled(PickersDay, {
  shouldForwardProp: prop => prop !== 'isSelected' && prop !== 'isHovered',
})(({ theme, isSelected, isHovered, day }) => ({
  borderRadius: 0,
  ...(isSelected && {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.main,
    },
  }),
  ...(isHovered && {
    backgroundColor: theme.palette.primary.light,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.light,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.primary.dark,
      '&:hover, &:focus': {
        backgroundColor: theme.palette.primary.dark,
      },
    }),
  }),
  ...(day.day() === 0 && {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  }),
  ...(day.day() === 6 && {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  }),
}));

const isInSameWeek = (dayA, dayB) => {
  if (dayB == null) {
    return false;
  }
  return dayA.isSame(dayB, 'week');
};

function Day(props) {
  const { day, selectedDay, hoveredDay, ...other } = props;

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={{ px: 2.5 }}
      disableMargin
      selected={false}
      isSelected={isInSameWeek(day, selectedDay)}
      isHovered={isInSameWeek(day, hoveredDay)}
    />
  );
}

export function Calendar({ selectedDateOrder, setViewCalendar }) {
  const { selectedDate, setSelectedDate } = selectedDateOrder;
  const [hoveredDay, setHoveredDay] = React.useState(null);

  const getSafeDate = date => {
    if (!date) return dayjs();

    if (dayjs.isDayjs(date) && date.isValid()) return date;

    const dayjsDate = dayjs(date);
    return dayjsDate.isValid() ? dayjsDate : dayjs();
  };

  const safeSelectedDate = getSafeDate(selectedDate);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='pt-br'>
      <DateCalendar
        value={safeSelectedDate}
        onChange={newValue => {
          const dateString = newValue ? newValue.format('YYYY-MM-DD') : null;
          setSelectedDate(dateString);
          setViewCalendar(false);
        }}
        showDaysOutsideCurrentMonth
        slots={{ day: Day }}
        slotProps={{
          day: ownerState => {
            return {
              selectedDay: safeSelectedDate,
              hoveredDay,
              onPointerEnter: () => setHoveredDay(ownerState.day),
              onPointerLeave: () => setHoveredDay(null),
            };
          },
        }}
      />
    </LocalizationProvider>
  );
}
