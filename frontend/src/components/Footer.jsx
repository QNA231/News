import React from 'react'
import logo from '../assets/logo.svg'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import { IconButton, Stack } from '@mui/material';

const Footer = () => {
  return (
    <div className="relative mx-50">
      <div className="grid grid-cols-4 items-center text-center">
        <a href='/'>
          <img src={logo} className='h-10' alt="Loop logo" />
        </a>
        <a href='#'>Điều khoản điều kiện</a>
        <a href='#'>Chính sách bảo mật</a>
        <div>
          <Stack direction="row" spacing={1}>
            <IconButton aria-label='facebook' sx={{ ':hover': { color: '#1877F2' } }} href='#' target='_blank'>
              <FacebookOutlinedIcon />
            </IconButton>
            <IconButton aria-label='instagram' sx={{ ':hover': { color: '#E4405F' } }} href='#' target='_blank'>
              <InstagramIcon />
            </IconButton>
            <IconButton aria-label='twitter' sx={{ ':hover': { color: '#1DA1F2' } }} href='#' target='_blank'>
              <TwitterIcon />
            </IconButton>
          </Stack>
        </div>
      </div>
      <div className='text-center mt-3'>©{new Date().getFullYear()} All Rights Reserved</div>
    </div>
  )
}

export default Footer