import { getUserJobs } from "@/supabase";
import { User } from "aws-sdk/clients/budgets";
import { useEffect, useState } from "react";

export interface Jobs {
	id: string;
	location: string;
	companyApplied: string;
	position: string;
    commitment: string;
    created_at: any
    status: 'APPLIED' 
}

export const useUserJobs = (user: any) => {
	const [jobs, setJobs] = useState([]);

	useEffect(() => {
		async function getUseJobs() {
			if (user) {
				const jobs: any = await getUserJobs(user);
				if (jobs) setJobs(jobs);
			}
		}
		getUseJobs();
	}, [user]);

	return jobs;
};
