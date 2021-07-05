import Vue from 'vue'
import Router from 'vue-router'
/*import JWT from 'jsonwebtoken'
import axios from 'axios'

const url = "http://localhost:8080"*/

Vue.use(Router)

const router = new Router( {
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'login',
            meta: { layout: 'login'},
            component: () => import('./views/Login')
        },
        {
            path: '/signup',
            name: 'register',
            meta: { layout: 'register'},
            component: () => import('./views/RegisterFromPatient')
        },
        {
            path: '/home',
            name: 'patientHome',
            meta: { layout: 'patientHome'},
            component: () => import('./views/PatientHome')
        },
        {
            path: '/children',
            name: 'chooseChildren',
            meta: { layout: 'chooseChildren'},
            component: () => import('./views/ChooseChildren')
        },
        {
            path: '/addchild',
            name: 'addChild',
            meta: { layout: 'addChild'},
            component: () => import('./views/AddChild')
        },
        {
            path: '/history',
            name: 'historyCard',
            meta: { layout: 'historyCard'},
            component: () => import('./views/History')
        },
        {
            path: '/vaccination',
            name: 'vaccination',
            meta: { layout: 'vaccination'},
            component: () => import('./views/Vaccination')
        },
        {
            path: '/pulse',
            name: 'pulse',
            meta: { layout: 'pulse'},
            component: () => import('./views/Metrics')
        },
        {
            path: '/questionnaire',
            name: 'questionnaire',
            meta: { layout: 'questionnaireList'},
            component: () => import('./components/patient/QuestionnaireList')
        },
        {
            path: '/add',
            name: 'adddoctor',
            meta: { layout: 'addDoctor'},
            component: () => import('./views/AddDoctor')
        },
        {
            path: '/profile',
            name: 'doctorProfile',
            meta: { layout: 'DoctorProfile'},
            component: () => import('./views/DoctorProfile')
        },
        {
            path: '/patients',
            name: 'patients',
            meta: { layout: 'patients'},
            component: () => import('./views/Patients')
        },
        {
            path: '/requests',
            name: 'patientsRequests',
            meta: { layout: 'patientsRequests'},
            component: () => import('./views/PatientsRequests')
        },
        {
            path: '/newvisit',
            name: 'newvisit',
            meta: { layout: 'newVisit'},
            component: () => import('./views/NewVisit')
        },
        {
            path: '/seedoctor',
            name: 'seedoctor',
            meta: { layout: 'seedoctor'},
            component: () => import('./views/SeeDoctorProfile')
        },
        {
            path: '/myvisits',
            name: 'myvisits',
            meta: { layout: 'visitList'},
            component: () => import('./components/patient/VisitsList')
        },
        {
            path: '/addquestionnaire',
            name: 'addquestionnaire',
            meta: { layout: 'questionnaire'},
            component: () => import('./views/Questionnaire')
        },
        {
            path: '/visits',
            name: 'visits',
            meta: { layout: 'visits'},
            component: () => import('./components/doctor/DoctorScheduleList')
        },
        {
            path: '/seepatient',
            name: 'seepatient',
            meta: { layout: 'seepatient'},
            component: () => import('./components/doctor/SeeProfilePatient')
        },
        {
            path: '/doctors',
            name: 'doctors',
            meta: { layout: 'adminDoctor'},
            component: () => import('./components/admin/AdminDoctors')
        },
        {
            path: '/adminpatients',
            name: 'adminpatients',
            meta: { layout: 'adminPatients'},
            component: () => import('./components/admin/AdminPatients')
        },
        {
            path: '/adminparents',
            name: 'adminparents',
            meta: { layout: 'adminParent'},
            component: () => import('./components/admin/AdminParent')
        },
        {
            path: '/register/doctor',
            name: 'registerDoctor',
            meta: { layout: 'registerDoctor'},
            component: () => import('./components/forms/RegisterFormDoctor')
        },
        {
            path: '/request/doctor',
            name: 'requestDoctor',
            meta: { layout: 'requestDoctor'},
            component: () => import('./components/admin/AdminDoctorReguestList')
        },
        {
            path: '/seehistory',
            name: 'seehistory',
            meta: { layout: 'seeHistoryPatient'},
            component: () => import('./components/doctor/SeeHistoryPatient')
        },
        {
            path: '/seequestionnaire',
            name: 'seequestionnaire',
            meta: { layout: 'seeQuestionnairePatient'},
            component: () => import('./components/doctor/SeeQuestionnairePatient')
        },
        {
            path: '/seevaccination',
            name: 'seevaccination',
            meta: { layout: 'seeVaccinationPatient'},
            component: () => import('./components/doctor/SeeVaccinationPatient')
        },


    ]
})

export default router;