// Dashboard.jsx
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function Dashboard() {
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserPlan = async () => {
      const user = auth.currentUser;
      if (user) {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPlan(docSnap.data().plan);
        }
      }
      setLoading(false);
    };

    fetchUserPlan();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;

  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, sans-serif' }}>
      <h1>Welcome to FeetFlow AI 👣</h1>
      {plan === 'pro' ? (
        <>
          <p>🌟 You're on the <strong>Pro Plan</strong>. Enjoy unlimited features!</p>
          {/* Pro features here */}
        </>
      ) : (
        <>
          <p>🛑 You're on the Free Plan.</p>
          <a href="#subscribe">Upgrade to Pro →</a>
        </>
      )}
    </div>
  );
}
