# Documentation Index

Complete documentation for the TaskFlow blog system and CMS setup.

## 📚 Documentation Files

### 1. [BLOG_SYSTEM_DOCUMENTATION.md](./BLOG_SYSTEM_DOCUMENTATION.md)
**Complete guide to the blog system**

Covers:
- Overview and features
- CMS setup (Decap CMS)
- Blog post structure
- Adding and editing posts
- Image management
- Formatting guidelines
- Technical architecture
- Deployment process
- Troubleshooting
- Best practices
- Quick reference

**Use this for**: Complete understanding of the blog system

---

### 2. [CONTENT_GUIDELINES.md](./CONTENT_GUIDELINES.md)
**Content creation and formatting guidelines**

Covers:
- Content structure templates
- Formatting rules
- SEO guidelines
- Writing style
- Image guidelines
- Quality checklist
- Examples (good vs bad)

**Use this for**: Creating and formatting blog posts

---

### 3. [TECHNICAL_SETUP.md](./TECHNICAL_SETUP.md)
**Technical architecture and implementation details**

Covers:
- System architecture
- File structure
- Key components
- Build process
- Netlify configuration
- Dependencies
- Path resolution
- Markdown processing
- API endpoints
- Error handling
- Performance considerations

**Use this for**: Understanding technical implementation and troubleshooting

---

### 4. [DECAP_CMS_SETUP.md](./DECAP_CMS_SETUP.md)
**Step-by-step Decap CMS setup guide**

Covers:
- Initial setup
- Configuration
- Authentication setup
- First blog post

**Use this for**: Initial CMS setup

---

### 5. [CMS_ALTERNATIVES.md](./CMS_ALTERNATIVES.md)
**CMS alternatives considered**

Covers:
- Comparison of CMS options
- Why Decap CMS was chosen

**Use this for**: Understanding CMS selection rationale

---

## 🚀 Quick Start

### For Content Creators

1. Read [CONTENT_GUIDELINES.md](./CONTENT_GUIDELINES.md) for formatting rules
2. Access CMS at `/admin`
3. Create new blog post
4. Follow content structure template
5. Publish

### For Developers

1. Read [TECHNICAL_SETUP.md](./TECHNICAL_SETUP.md) for architecture
2. Review [BLOG_SYSTEM_DOCUMENTATION.md](./BLOG_SYSTEM_DOCUMENTATION.md) for system overview
3. Check `netlify.toml` for configuration
4. Review Netlify Functions in `netlify/functions/`

### For Troubleshooting

1. Check [BLOG_SYSTEM_DOCUMENTATION.md](./BLOG_SYSTEM_DOCUMENTATION.md) Troubleshooting section
2. Review [TECHNICAL_SETUP.md](./TECHNICAL_SETUP.md) for technical details
3. Check Netlify Function logs
4. Verify configuration files

---

## 📋 Common Tasks

### Creating a Blog Post

1. Go to `/admin`
2. Click "New Blog Post"
3. Fill in frontmatter
4. Write content
5. Upload images
6. Publish

**See**: [CONTENT_GUIDELINES.md](./CONTENT_GUIDELINES.md) for formatting

### Adding Images

1. Upload via CMS image widget, OR
2. Add to `client/public/images/`
3. Reference as `/images/filename.png`

**See**: [BLOG_SYSTEM_DOCUMENTATION.md](./BLOG_SYSTEM_DOCUMENTATION.md) Image Management section

### Troubleshooting Issues

1. Check relevant documentation file
2. Review Netlify Function logs
3. Verify configuration
4. Check browser console

**See**: [BLOG_SYSTEM_DOCUMENTATION.md](./BLOG_SYSTEM_DOCUMENTATION.md) Troubleshooting section

---

## 🔍 Finding Information

### By Topic

- **CMS Setup**: [DECAP_CMS_SETUP.md](./DECAP_CMS_SETUP.md)
- **Content Creation**: [CONTENT_GUIDELINES.md](./CONTENT_GUIDELINES.md)
- **Technical Details**: [TECHNICAL_SETUP.md](./TECHNICAL_SETUP.md)
- **System Overview**: [BLOG_SYSTEM_DOCUMENTATION.md](./BLOG_SYSTEM_DOCUMENTATION.md)
- **Troubleshooting**: [BLOG_SYSTEM_DOCUMENTATION.md](./BLOG_SYSTEM_DOCUMENTATION.md) Troubleshooting section

### By Role

- **Content Creator**: Start with [CONTENT_GUIDELINES.md](./CONTENT_GUIDELINES.md)
- **Developer**: Start with [TECHNICAL_SETUP.md](./TECHNICAL_SETUP.md)
- **Admin**: Start with [BLOG_SYSTEM_DOCUMENTATION.md](./BLOG_SYSTEM_DOCUMENTATION.md)

---

## 📝 Documentation Maintenance

### When to Update

- New features added
- Configuration changes
- Process improvements
- Bug fixes that affect workflow
- New best practices discovered

### Update Process

1. Identify relevant documentation file
2. Update specific section
3. Update "Last Updated" date
4. Test changes if applicable
5. Commit with descriptive message

---

## 🔗 Related Resources

### External Documentation

- [Decap CMS Docs](https://decapcms.org/docs/)
- [Netlify Functions Docs](https://docs.netlify.com/functions/overview/)
- [Tailwind Typography](https://tailwindcss.com/docs/plugins/typography)
- [Remark Documentation](https://remark.js.org/)

### Internal Files

- `netlify.toml` - Netlify configuration
- `client/public/admin/config.yml` - CMS configuration
- `netlify/functions/blog.ts` - Blog listing function
- `netlify/functions/blog-slug.ts` - Single post function

---

**Last Updated**: December 2024

