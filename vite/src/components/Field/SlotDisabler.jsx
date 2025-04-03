import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Paper,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useTheme } from "@emotion/react";
import moment from "moment";

// Validation Schema
const validationSchema = Yup.object({
  type: Yup.string().required("Type is required"),
  day: Yup.string().when("type", {
    is: "recurring",
    then: Yup.string().required("Day is required for recurring"),
    otherwise: Yup.string(),
  }),
  date: Yup.string().when("type", {
    is: "once",
    then: Yup.string().required("Date is required for once"),
    otherwise: Yup.string(),
  }),
  timeRange: Yup.string().required("Time range is required"),
});

const Scheduler = () => {
  const [entries, setEntries] = useState([]);
  const theme = useTheme();

  const handleSubmit = (values, { resetForm }) => {
    setEntries((prev) => [...prev, values]);
    resetForm();
  };

  const generateTimeSlots = () => {
    const slots = [];
    const start = moment("12:00 AM", "hh:mm A");
    const end = moment("11:30 PM", "hh:mm A");

    while (start <= end) {
      const next = moment(start).add(30, "minutes");
      slots.push(`${start.format("hh:mm A")} - ${next.format("hh:mm A")}`);
      start.add(30, "minutes");
    }

    return slots;
  };

  return (
    <Box padding={4}>
      <Typography variant="h4" marginBottom={2}>
        Schedule Form
      </Typography>
      <Formik
        initialValues={{
          type: "recurring",
          day: "",
          date: "",
          timeRange: "",
          wholeDay: false,
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleChange, setFieldValue }) => (
          <Form>
            <Grid container spacing={3}>
              {/* Type Selection */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customSelect }}>
                  <InputLabel id="tags-label-disable">Type Of Disable</InputLabel>
                  <Select name="type" value={values.type} onChange={handleChange}>
                    <MenuItem value="recurring">Recurring</MenuItem>
                    <MenuItem value="once">Once</MenuItem>
                  </Select>
                </FormControl>
                {errors.type && touched.type && (
                  <Typography color="error">{errors.type}</Typography>
                )}
              </Grid>

              {/* Day or Date */}
              {values.type === "recurring" ? (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ ...theme.typography.customSelect }}>
                    <InputLabel id="tags-label-day">Select Day</InputLabel>
                    <Select name="day" value={values.day} onChange={handleChange}>
                      <MenuItem value="Sunday">Sunday</MenuItem>
                      <MenuItem value="Monday">Monday</MenuItem>
                      <MenuItem value="Tuesday">Tuesday</MenuItem>
                      <MenuItem value="Wednesday">Wednesday</MenuItem>
                      <MenuItem value="Thursday">Thursday</MenuItem>
                      <MenuItem value="Friday">Friday</MenuItem>
                      <MenuItem value="Saturday">Saturday</MenuItem>
                    </Select>
                  </FormControl>
                  {errors.day && touched.day && (
                    <Typography color="error">{errors.day}</Typography>
                  )}
                </Grid>
              ) : (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel id="tags-label-day">Select Date</InputLabel>
                    <OutlinedInput
                      name="date"
                      label="Date"
                      type="date"
                      fullWidth
                      value={values.date}
                      onChange={handleChange}
                      InputLabelProps={{ shrink: true }}
                    />
                    {errors.date && touched.date && (
                      <Typography color="error">{errors.date}</Typography>
                    )}
                  </FormControl>
                </Grid>
              )}

              {/* Whole Day Checkbox */}
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="wholeDay"
                      checked={values.wholeDay}
                      onChange={(e) => setFieldValue("wholeDay", e.target.checked)}
                    />
                  }
                  label="Whole Day"
                />
              </Grid>

              {/* Time Fields */}
              {!values.wholeDay && (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth sx={{ ...theme.typography.customSelect }}>
                    <InputLabel id="time-range-label">Time Range</InputLabel>
                    <Select
                      labelId="time-range-label"
                      name="timeRange"
                      value={values.timeRange}
                      onChange={handleChange}
                      fullWidth
                    >
                      {generateTimeSlots().map((slot) => (
                        <MenuItem key={slot} value={slot}>
                          {slot}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.timeRange && touched.timeRange && (
                      <Typography color="error">{errors.timeRange}</Typography>
                    )}
                  </FormControl>
                </Grid>
              )}

              {/* Submit Button */}
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Add Entry
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>

      {/* Table */}
      <Box marginTop={4}>
        <Typography variant="h5" marginBottom={2}>
          Scheduled Entries
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Day/Date</TableCell>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Whole Day</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.type}</TableCell>
                  <TableCell>{entry.type === "recurring" ? entry.day : entry.date}</TableCell>
                  <TableCell>{entry.wholeDay ? "N/A" : entry.from}</TableCell>
                  <TableCell>{entry.wholeDay ? "N/A" : entry.to}</TableCell>
                  <TableCell>{entry.wholeDay ? "Yes" : "No"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Scheduler;
