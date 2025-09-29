import { Container, Typography, Box, Select, MenuItem } from "@mui/material";

function SectionComponent({ title, items }) {
    return (
        <>
            <Box display="flex" alignItems="center" mb={2}>
                <img src={icon} alt={name} style={{ width: 32, height: 32, marginRight: 16 }} />
                <Typography sx={{ flex: 1 }}>{name}</Typography>
                <Select
                    value={option}
                    onChange={onChange}
                    size="small"
                    sx={{ minWidth: 100 }}
                >
                    {options.map((opt) => (
                        <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                    ))}
                </Select>
            </Box>
        </>
    );
}

export function SectionComponent({ title, items }) {
  return (
    <>
      <Typography variant="h6" mb={2}>{title}</Typography>
      <Container>
        {items.map((item, idx) => (
          <HorizontalItem
            key={idx}
            icon={item.icon}
            name={item.name}
            option={item.option}
            options={item.options}
            onChange={item.onChange}
          />
        ))}
      </Container>
    </>
  );
}
