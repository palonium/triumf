import express from 'express';
import path from 'path';
import addressesRoutes from './routes/addressesRoutes';
import requestsRoutes from './routes/requestsRoutes';
import schedulesRoutes from './routes/schedulesRoutes';
import teamsRoutes from './routes/teamsRoutes';
import usersRoutes from './routes/usersRoutes';
import childrenRoutes from './routes/childrenRoutes';
import authRoutes from './routes/authRoutes';
import parentRoutes from './routes/parentRoutes';
import childRoutes from './routes/childRoutes';
import bookingRoutes from './routes/bookingRoutes';

const app = express();
app.use(express.json());
app.use('/api/addresses', addressesRoutes);
app.use('/api/requests', requestsRoutes);
app.use('/api/schedules', schedulesRoutes);
app.use('/api/teams', teamsRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/children', childrenRoutes);
app.use('/api', authRoutes);
app.use('/api', parentRoutes);
app.use('/api', childRoutes);
app.use('/api', bookingRoutes);

const clientBuildPath = path.join(__dirname, '../client/dist');
app.use(express.static(clientBuildPath));

app.use((req, res, next) => {
	if (req.path.startsWith('/api/')) {
		res.status(404).json({ error: 'Not found' });
	} else {
		res.sendFile(path.join(clientBuildPath, 'index.html'));
	}
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} http://localhost:${PORT}/`));