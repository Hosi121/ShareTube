class Video:
    def __init__(self, id, user_id, title, description, video_url, likes, created_at, tags):
        self.id = id
        self.user_id = user_id
        self.title = title
        self.description = description
        self.video_url = video_url
        self.likes = likes
        self.created_at = created_at
        self.tags = tags

