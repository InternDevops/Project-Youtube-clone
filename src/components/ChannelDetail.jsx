import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import { ChannelCard, Videos } from './';
import { fetchFromAPI } from '../utils/fetchFromAPI';

const ChannelDetail = () => {
  const [ChannelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  console.log(ChannelDetail, videos)

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet&id=${id}`)
      .then((data) => setChannelDetail(data?.items[0]))

    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`)
      .then((data) => setVideos(data?.items))
  }, [id])

  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={{
          background: 'linear-gradient(90deg, rgba(253,29,29,1) 0%, rgba(199,42,95,1) 13%, rgba(131,58,180,1) 50%, rgba(194,119,122,1) 85%, rgba(252,176,69,1) 100%)',
          zIndex: 10,
          height: '300px'
        }}
        />
          <ChannelCard ChannelDetail={ChannelDetail} marginTop='-120px'/>
      </Box>
      <Box display="flex" p="2">
        <Box sx={{ mr: { sm: '100px' }}} />
           <Videos videos={videos} />
      </Box>  
    </Box>
  );
};

export default ChannelDetail