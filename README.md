# Digital Garden Portfolio

A personal website built with Quarto, featuring a blog layout with a responsive grid of posts, customized sidebar, and modern design elements.

![Portfolio Preview](images/profile/profile.jpg)

## Features

- Responsive design with mobile-friendly layout
- Fixed left sidebar with profile picture, bio, and navigation
- Grid layout for blog posts with featured images
- Custom styling with SCSS
- Dark/light mode toggle
- Code syntax highlighting
- Search functionality
- Subtle animations and micro-interactions
- Category filtering for blog posts

## Getting Started

### Prerequisites

- [Quarto](https://quarto.org/docs/get-started/) (>= 1.2.0)
- A text editor (VS Code recommended)

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/digital-garden.git
cd digital-garden
```

2. Preview the website:
```bash
quarto preview
```

3. Build the website for production:
```bash
quarto render
```

The output will be in the `docs/` directory, ready to be deployed.

## Customization

### Adding a New Post

Create a new `.qmd` file in the `posts/` directory with the following YAML front matter:

```yaml
---
title: "Your Post Title"
author: "Your Name"
date: "2023-12-31"
categories: [category1, category2]
image: "../images/posts/your-image.jpg"
description: "A short description of your post."
---

# Your Post Content
```

### Updating Profile Information

1. Replace the profile image in `images/profile/profile.jpg`
2. Update the information in `about.qmd`
3. Edit the social media links in `_quarto.yml`

### Customizing Style

- Edit `custom.scss` for theme-level customization
- Modify `styles.css` for additional CSS styling

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Quarto](https://quarto.org/) for the publishing system
- [Bootstrap](https://getbootstrap.com/) for the responsive framework
- [Font Awesome](https://fontawesome.com/) for the icons 