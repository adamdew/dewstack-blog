+++
title = "Homelab log: Hosting a personal website at home"
date = 2025-09-08
description = "Save yourself a buck and host from home!"

[taxonomies] 
tags = ["homelab", "linux", "personal site", "hosting", "dns", "cloudflare", "dns tunneling"]
+++

# Hosting a personal website at home

People in creative fields often are expected to have a personal blog and/or project showcase. Of course you could use a website service like Wix or Squarespace, they probably have some free tiers, but as things go in this day and time, if you establish your site on one of these services, you and your content can become ensnared in a monthly subscription scheme. If you're like me and you're willing to go to considerable lengths to avoid having to pay for things, this post is for you.

Why don't we host our own personal sites? We don't need digital ocean’s/amazons 99.999% up-time promise anyway, if my cat bumps into my server and it goes offline, I'll just walk up stairs and reboot the thing. I promise you'll be happy to do this from time to time being that your site hosting is completely free.

I recently went through this process of setting this site, hosted on my old college laptop (a Dell Inspiron 15 5000 Series (2015)). In this post, I’ll be touching on some of the lightbulb moments as well as some barriers that I ran into along the way in setting up this site.

## What kind of hardware do you need at home to run a blog website?  
  
The answer here is very simple. Anything with more than a 1 core, 2 GB of ram and at least 100GB of hard drive space should be enough to hold an operating system and your website content. If you plan on a lot of assets like png/jpgs you may need more hard drive space.

The good news here is that your old beater laptop is gonna work fine for hosting your site. *As a matter of fact, your old beater laptop is gonna work perfectly*. Here's why:

1.  Laptops have built-in backup battery packs - This is great if you live in an area where your power flickers during heavy storms. This will result in easier server maintenance and improved uptime of your site. You basically get a free UPS. So during a power flicker, your site will be back up as soon as your home router comes back online.
    
2.  You don't have to buy anything
    
3.  You can install whatever software you want on it. Any OS and however you want to run your site is up to you.
      
## What kind of software do you need to run a blog site?  
  
1. I’d recommend installing a lightweight, linux based, server OS on your machine. Ubuntu server OS worked perfectly for my Dell laptop rig. You’ll need to know the very basics of how to navigate a filesystem via the command line, so make sure you get yourself a linux cheat sheet and/or watch some linux youtube videos. This is a thing to understand whether you are an engineer or not. Linux runs the world, and you should know the basics.

2. Containerization - Youll need some containerization software. I like docker, but you can also install a hypervisor like proxmox if you want more simplicity. Containerization will allow you to run your site inside it’s own context, meaning that it lives on an island. All it’s dependencies exist inside its container. So you can update you main system without having to worry about unintended side effects on your site. This will result in a rock solid, stable running server, that’s not gonna fall down if you run an operating system update.

4.  You’ll need a super dope domain name. You can just buy a cheap one online. I went with namecheap because they seemed to have the best prices at the time of this post. This domain is 7 dollars a year.
    
5.  Read up a little bit on DNS and how it works. This is an old technology, but it is one of the core building blocks of the internet. We will talk more about this later in the Cloudflare section.
    
## How the heck do you build a personal website?

This is the first real fork in the road. For personal blogs and project showcases I would recommend you build a static site. There are plenty of frameworks that you can use to build like this. For this site I used Zola, it allows me to write all my blog posts over SSH and in a simple markdown (md) format. When I want to post, I move the markdown file that contains my blog post to the blog folder and I run the command to rebuild the site. That’s it, there's no logging in to an admin interface or anything. All of this can be done over an SSH connection. This makes putting up new blog posts super easy, SEO and design are separated from content making it easy to maintain and the build process is blazing fast (powered by Rust btw).

If you don't care to mess around with the command line interface too much, You can set up a more traditional blog using wordpress, but keep in mind that if you make this choice you will also need to run a containerized mysql database on the side of your website. For most personal blog sites, a database is overkill (in my opinion).  
  
*Keep in mind that you are setting up something that will run your site for a long time. You may have a hard time with it, you will run into roadblocks if you have not done this before. But when it’s done, it’s done, and you'll never have to pay anyone so that they can own your content. So stick with it, it’s worth it, I promise.*  
  
## How do you show the world your site?
So your site is finished! Great job! But now it’s time to show the world. We need to tell the internet where your new site lives. We do this by setting up DNS records that point your host hardware to your sick new domain.
  
Chances are you don't have a commercial internet plan at home that supports a static IP4/6 that you can just point your DNS at with a standard A record. This is because most ISPs are not really in love with the idea of regular people hosting public web services from home. They would really love to charge you more for a static IP, but that’s not gonna happen. There are perfectly legal ways around this that completely bypass your ISP. Namely, Cloudflare DNS tunneling.

## Protect your investment
Before you open a port on your machine to the public internet you need to make sure your machine is ready to face whatever the public internet is willing to throw at it. The last thing you want to do is leave a unprotected port open on your publicly accessible machine. Doing so could expose you to  repeated brute force password attempts, ransomware, DDOS attacks and a mountain of other horrible shit that will ruin all your hard work. You're the only one you want making blog posts right?? In my case needed just 2 ports open, one for SSH access (key only), and one for the website. I configured Uncomplicated Firewall (ufw) on my server to do this. I also installed fail2ban on my server to block and jail repeated SSH access. None of this is that complicated to configure via the respective CLIs so I wont go into too much detail in this post.
  
## Tunnels?
Cloudflare offers as a part of their free DNS hosting a service called DNS tunnels. This is an always-on service (apt systemd service on ubuntu) that will run on your webserver that establishes a tunneled connection to Cloudflare's DNS servers. It tells Cloudflare where to tell the internet where your site is. The setup is pretty simple and I would recommend this for personal sites.  
  
## Cloudflare DNS Tunneling and protecting the privacy of your users
When you use this service, Cloudflare encrypts *and decrypts* all HTTPS requests coming to and from your server. So if you ever plan on taking credit card payments on your site, or transmitting personal information via HTTPS, just know that your privacy could be compromised. Think of it like you are letting Cloudflare read all the traffic that your site sends and receives. For a personal blog site this is fine. All the posts are public information anyways. But if you ever plan on collecting your website visitors PII, you should disclose this to your users and consider moving away from tunneled DNS. Otherwise, your user’s PII may be exposed to bad actors if Cloudflare ever gets hacked… Which has happened before. So be responsible with other peoples personal information if you plan on storing it!!!

## Conculsion
That’s pretty much it! I had a ton of fun with this project and I hope to write more about it in the future as I add some more features. Being a web dev, I rarely get to get my hands on the operating system like I was able to in this project. It really helped me fill in a bunch of knowledge gaps that I’ve always felt needed filling. I hope you find the same joy in setting up your site! If you’ve got my contact info (LinkedIn, email, text) and you’ve started on a project like this, reach out to me if you have questions I'd be happy to help!

-Happy Trails
