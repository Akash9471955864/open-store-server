import express from 'express';
import path from 'path';

export const router = express.Router({
  strict: true,
});

const assets_path = path.join(__dirname, '../../../assets');
router.use(express.static(assets_path));
