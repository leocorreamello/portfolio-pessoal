# Deployment checklist

## Prerequisites
- Set up Supabase project
- Configure admin allowlist emails
- Upload resume file bucket
- Define environment variables

## Environment variables
Create a production `.env` with:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_SUPABASE_CONTENT_TABLE`
- `VITE_SUPABASE_RESUME_BUCKET`
- `VITE_ADMIN_EMAILS`
- `VITE_CONTENT_SOURCE=supabase`

## Build verification
Run before deploy:
- `npm run lint`
- `npm run build`

## Hosting guidance
### Vercel / Netlify
- Use the `portifolio` folder as the app root
- Build command: `npm run build`
- Output directory: `dist`

### GitHub Pages
- Prefer only for the public SPA if admin is not required
- Ensure client-side routing fallback is configured

## Final production checklist
- [ ] Favicon loads correctly
- [ ] Meta tags are present
- [ ] Admin route is protected
- [ ] Supabase content source works
- [ ] Resume upload bucket is configured
- [ ] Backup export works in admin
- [ ] Local cache fallback works
- [ ] Build passes without warnings blocking release
