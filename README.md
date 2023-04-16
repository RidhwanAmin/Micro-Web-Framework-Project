# Micro-Web-Framework-Challenge

Run using "npm run dev"

Story 1 <br>
In order to store and use my pictures online (or through a "Service"),
As an Anonymous user,
I want to attach a picture to the Service,
And I want to have a permanent link to this picture,
Otherwise, I want to be rejected and informed if the file is not a picture.


Story 2.1 <br>
In order to save my time from uploading my pictures multiple times via the Service:
As an Anonymous user,
I want to attach a zip file containing images,
And I want each of these uploaded images to have a permanent link.

Story 2.2 <br>
In order to use my uploaded images at different sizes (thumbnails):
As an Anonymous user,
As an Anonymous user, I want to have thumbnails returned for any uploaded images which sizes are
equal to or larger than 128px by 128px <br>
● If the uploaded image is smaller than 128px by 128px, no thumbnails should be generated.
Just return the original image as the thumbnail.<br>
● If the uploaded image is equal to or larger than 128px by 128px, two thumbnails should be
generated - one 32px wide and the other 64px wide. Thumbnails must retain the original
aspect ratio. For example, an uploaded image of 128 px by 160px should generate
thumbnails 32 px by 40px and 64px by 80px. <br>
● Thumbnails must respect the uploaded image’s aspect ratio.

