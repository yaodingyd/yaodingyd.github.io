---
layout: post
title:  "AWS for Dummies"
date:   2019-06-18
---

1. `Inbound traffic` means who has access to this instance(call to this server), `outbound traffic` means who this instance can call to. We allow all outbound traffic by default because we don't limit what this instance can make call to, and inbound traffic needs to be hand-picked.
2. You can configure a Security Group to permit Inbound connections from itself (that is, the security group has its own ID as the Source of the inbound connection). This would enable any Amazon EC2 instance that is associated with the security group to communicate with any other Amazon EC2 instance that is associated with the same security group (on the given port).