"use client"
import React, { useEffect, useState } from 'react'
import JobCard from "@/components/JobCard"

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

  useEffect(() => {
    async function getData() {
      const response = await fetch("/data.json");
      const data = await response.json();
      setJobs(data);
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className='space-y-5 py-5 md:py-0 mx-4'>

      {loading ? <div>Loading...</div> : jobs.map((job, idx) => <JobCard key={idx} {...job} />)}

    </div>
  );
}

export default Home;
