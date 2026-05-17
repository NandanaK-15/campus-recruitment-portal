\# Campus Recruitment Portal



A Node.js REST API application for managing student placement records,

automatically deployed on AWS using CodePipeline, Lambda, SSM, EC2, and RDS.



\## Architecture

GitHub → CodePipeline → S3 → Lambda → SSM → EC2 → RDS (MySQL)



\## Tech Stack

\- Node.js + Express

\- MySQL (AWS RDS)

\- Sequelize ORM

\- AWS CodePipeline

\- AWS S3

\- AWS Lambda

\- AWS SSM

\- AWS EC2



\## API Endpoints

| Method | Endpoint | Description |

|--------|----------|-------------|

| GET | /api/students | Get all students |

| GET | /api/students/:id | Get student by ID |

| GET | /api/students/placed | Get placed students |

| POST | /api/students | Add new student |

| PUT | /api/students/:id | Update student |

| DELETE | /api/students/:id | Delete student |



\## Automated Deployment

Every push to GitHub triggers CodePipeline automatically.

The application is deployed to EC2 without any manual intervention.

