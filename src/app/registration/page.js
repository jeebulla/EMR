"use client";
import React, { useState, useEffect } from "react";
// import "./globals.css";

//** MUI imports */
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";

//** Third-Party Imports
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// ** Components & Utils import
import { useForm, Controller, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { newPatientSchema } from "@/Schema";
import { formatDateToYYYMMDDD } from "../../utils/format";

import { patientName } from "@/utils/utils";
import Loading from "../../components/Loading";

const Registration = () => {
  // ** States
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");

  const defaultValues = {
    surname: "",
    otherNames: "",
    email: "",
    phoneNumber: "",
    gender: "",
    dob: "",
    address: "",
  };

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(newPatientSchema),
  });

  const handleDate = (date) => {
    const formatDate = formatDateToYYYMMDDD(date);
    setDate(formatDate);
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <Box sx={{ display: "flex", alignItems: "start", gap: { xs: 0, md: 10 } }}>
      <Box
        sx={{
          width: { xs: "100%", md: "70%" },
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          p: { xs: 3, md: 6 },
          boxShadow: "rgba(0, 24, 78, 0.25) 0px 5px 15px",
          mt: 15,
          background: "white",
        }}
      >
        <Typography variant="h5">Create New Patient</Typography>
        {loading ? (
          <Loading />
        ) : (
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={6} sx={{ py: 2 }}>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="surname"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Surname"
                        placeholder="John"
                        value={value}
                        onChange={onChange}
                        //   onBlur={() => patientData(key)}
                        required
                        error={Boolean(errors?.surname)}
                        {...(errors?.surname && {
                          helperText: "Patient surname is required ",
                        })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="otherNames"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        //   disabled={!verifyPatient}
                        label="Other Names"
                        placeholder="John Doe"
                        value={value}
                        onChange={onChange}
                        required
                        error={Boolean(errors?.otherNames)}
                        {...(errors?.otherNames && {
                          helperText: "Enter your other names is required",
                        })}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={6} sx={{ py: 2 }}>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="email"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Email"
                        required
                        placeholder="Example@mail.com"
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors?.email)}
                        {...(errors?.email && {
                          helperText: "Email address is required",
                        })}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Phone Number"
                        required
                        placeholder="+234-80-0000-0000"
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors?.phoneNumber)}
                        {...(errors?.phoneNumber && {
                          helperText: "Phone number is required",
                        })}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={6} sx={{ py: 2 }}>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        value={value}
                        label="Gender"
                        select
                        required
                        sx={{ width: "100%" }}
                        onChange={onChange}
                        placeholder="male/female/other"
                        error={Boolean(errors?.gender)}
                        {...(errors?.gender && {
                          helperText: errors?.gender?.message,
                        })}
                      >
                        <MenuItem value="">Choose your Gender</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </TextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                  <Controller
                    name="dob"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        sx={{ width: "100%", overflow: "hidden" }}
                        selected={value}
                        popperPlacement="bottom-end"
                        showYearDropdown
                        showMonthDropdown
                        onChange={(e) => handleDate(e)}
                        placeholderText="2022-05-07"
                        customInput={
                          <TextField
                            fullWidth
                            sx={{
                              width: "100%",
                              minWidth: { xs: 595, lg: 294 },
                            }}
                            label="Date of Birth"
                            required
                            value={value}
                            onChange={onChange}
                            error={Boolean(errors?.dob)}
                            {...(errors?.dob && {
                              helperText: "Date of birth is required",
                            })}
                          />
                        }
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={6} sx={{ py: 2 }}>
                <Grid item xs={12} sm={12}>
                  <Controller
                    name="address"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Address"
                        required
                        placeholder="Enter your Address"
                        value={value}
                        onChange={onChange}
                        error={Boolean(errors?.address)}
                        {...(errors?.address && {
                          helperText: "Address is required",
                        })}
                      />
                    )}
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  mt: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{
                    background: "#23A455",
                    "&:hover": {
                      background: "#23A455",
                    },
                    fontSize: "12px",
                    px: 3,
                    py: 1,
                  }}
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <CircularProgress size={20} sx={{ ml: 3 }} />
                  ) : (
                    "Create"
                  )}
                </Button>
              </Box>
            </form>
          </Box>
        )}
      </Box>
      <Box sx={{ mt: 5, display: { xs: "none", md: "block" } }}>
        <img
          loading="lazy"
          decoding="async"
          width="683"
          height="300"
          src="https://dedahospital.com/newsite/wp-content/uploads/2018/11/figure2.png"
          class="attachment-full size-full wp-image-714"
          alt="Doctor posing with lab-coat"
          srcset="https://dedahospital.com/newsite/wp-content/uploads/2018/11/figure2.png 683w, https://dedahospital.com/newsite/wp-content/uploads/2018/11/figure2-205x300.png 205w, https://dedahospital.com/newsite/wp-content/uploads/2018/11/figure2-600x878.png 600w"
          sizes="(max-width: 683px) 100vw, 683px"
        />
      </Box>
    </Box>
  );
};

export default Registration;
