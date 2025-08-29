export const styleCalendar = (theme) => ({
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    border: `2px solid ${theme.palette.primary.main}`, // usa a cor primária do tema
    padding: 0,
    borderRadius: 4,
    '&.MuiDateCalendar-root': {
        minHeight: '100%', // força altura mínima
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        // ou height: 500 se quiser fixar exatamente
    },
    '& .MuiDayCalendar-weekDayLabel': {
        width: 48,
        lineHeight: '48px',
        margin: 0,
        textAlign: 'center',
        fontWeight: 600,
        textTransform: 'none',
        boxSizing: 'border-box',
        color: theme.palette.primary.main,
    },
    '& .MuiPickersDay-root': {
        borderRadius: 0,
        border: `1px solid #e0e0e0`,
        margin: 0,
        height: 47,
        width: 47,
        minWidth: 0,
        minHeight: 0,
        boxSizing: 'border-box',
        fontWeight: 'bold'
    },
    '& .MuiPickersCalendarHeader-label': {
        textTransform: 'capitalize',
        color: theme.palette.primary.main,
        fontWeight: 'bold',
        fontSize: '1.50rem',

    },
    '& .MuiDayCalendar-weekContainer': { margin: 0 },
    '& .MuiDayCalendar-header': { px: 0, mx: 0 },
    '& .MuiPickersDay-dayOutsideMonth': {
        color: 'rgba(0,0,0,0.3)', // deixa os dias fora do mês mais claros
    },
    '& .MuiDayCalendar-slideTransition': {
        minHeight: 500,
        
    },
})