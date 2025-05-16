import { useRouter } from 'vue-router';

const router = useRouter();

const handleTileClick = (prompts) => {
  // Navigate to CIO Interrogator with the first prompt
  router.push({
    path: '/cio-interrogator',
    query: { prefill: prompts[0] }
  });
}; 