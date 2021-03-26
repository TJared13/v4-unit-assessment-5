SELECT hp.id AS post_id, title, content, img, profile_pic, date_created, username AS author_username FROM helo_posts hp
JOIN helo_users hu ON hu.id = hp.id
WHERE post_id.author_id != $2
WHERE LOWER(title) LIKE $1
GROUP BY hp.author_username != $1
ORDER BY date_created DESC;