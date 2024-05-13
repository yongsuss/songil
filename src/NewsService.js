import axios from 'axios';

const fetchDonationNews = async () => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: '취약계층 OR 기부 OR 기초수급', // 기부 관련 뉴스 검색
        sortBy: 'publishedAt AND relevancy', // 가장 관련성 높은 뉴스를 우선으로
        language: 'ko', // 한국어 뉴스
        //domains: 'yna.co.kr,hani.co.kr,kyunghyang.com,donga.com',
        responseType: 'arraybuffer',  // 응답을 ArrayBuffer로 받음
        apiKey: 'd96b7ff4c19848e4befe29d24f9f7183'
      }
    });
    console.log(JSON.stringify(response.data, null, 2)); // 응답 전체를 JSON 형식으로 로그 출력
    const articles = response.data.articles;
    return removeDuplicates(articles);
  } catch (error) {
    console.error('Error fetching donation news:', error);
    return [];
  }
};

const removeDuplicates = (articles) => {
  const uniqueArticles = [];
  const seenUrls = new Set();

  for (let article of articles) {
    if (!seenUrls.has(article.url)) {
      uniqueArticles.push(article);
      seenUrls.add(article.url);
    }
  }

  return uniqueArticles;
};

export default fetchDonationNews;