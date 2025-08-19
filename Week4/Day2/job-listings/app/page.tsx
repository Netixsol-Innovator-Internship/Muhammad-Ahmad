"use client"
import React, { useEffect, useState, useMemo } from 'react'
import JobCard from "@/components/JobCard"
import FilterBar from '@/components/FilterBar';
import { useFilterStore } from '@/store/filterStore';

// Interface which will define the shape of Job object
interface Job {
  logo: string,
  company: string,
  new: boolean,
  featured: boolean,
  position: string,
  role: string,
  level: string,
  postedAt: string,
  contract: string,
  location: string,
  languages: [string],
  tools?: [string]
}

function Home() {

  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const { activeFilters } = useFilterStore();

  useEffect(() => {
    async function getData() {
      const response = await fetch("/data.json");
      const data = await response.json();
      setJobs(data);
      setLoading(false);
    }
    getData();
  }, []);

  // Filter jobs based on active filters
  const filteredJobs = useMemo(() => {
    if (activeFilters.length === 0) {
      return jobs;
    }

    return jobs.filter((job) => {
      const jobFilters = [job.role, job.level, ...job.languages];
      if (job.tools) {
        jobFilters.push(...job.tools);
      }
      
      // Check if all active filters are present in this job's filters
      return activeFilters.every(filter => jobFilters.includes(filter));
    });
  }, [jobs, activeFilters]);

  return (

    <div className='mx-4'>
      <FilterBar />
      <div className={`${activeFilters.length > 0 ? 'mt-8' : 'mt-20'} md:mt-0`}>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : filteredJobs.length > 0 ? (
          filteredJobs.map((job, idx) => <JobCard key={idx} {...job} />)
        ) : (
          <div className="text-center py-8 text-[#7b8e8e]">
            No jobs match the selected filters.
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
